import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { HealthcareFacility } from '../types';
import {
  UserLocation,
  getSavedUserLocation,
  saveUserLocation,
  reverseGeocode,
  fetchLiveOverpassHospitals,
  getHospitalsWithDistances,
  searchLocation,
  REGIONAL_INDIAN_HOSPITALS,
  calculateDistanceKm
} from '../services/locationService';

interface LocationContextType {
  userLocation: UserLocation;
  isLoadingLocation: boolean;
  locationError: string | null;
  nearbyHospitals: HealthcareFacility[];
  isLoadingHospitals: boolean;
  requestLiveLocation: () => Promise<void>;
  setManualLocation: (query: string) => Promise<boolean>;
  openGoogleMapsNearMe: () => void;
  refreshHospitals: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userLocation, setUserLocation] = useState<UserLocation>(getSavedUserLocation);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<HealthcareFacility[]>(() =>
    getHospitalsWithDistances(userLocation.lat, userLocation.lng)
  );
  const [isLoadingHospitals, setIsLoadingHospitals] = useState<boolean>(false);

  // Function to load hospitals for a given set of coordinates
  const loadHospitals = useCallback(async (lat: number, lng: number) => {
    setIsLoadingHospitals(true);
    try {
      // 1. First immediately calculate distances with regional database
      const fallbackList = getHospitalsWithDistances(lat, lng, REGIONAL_INDIAN_HOSPITALS);
      setNearbyHospitals(fallbackList);

      // 2. Fetch live hospitals around this coordinate via OpenStreetMap Overpass
      const liveList = await fetchLiveOverpassHospitals(lat, lng, 25000);
      if (liveList && liveList.length > 0) {
        // Merge live hospitals with regional ones (prevent duplicates)
        const combined = [...liveList];
        for (const fb of fallbackList) {
          if (!combined.some(c => c.nameEn.toLowerCase() === fb.nameEn.toLowerCase())) {
            combined.push({
              ...fb,
              distanceKm: calculateDistanceKm(lat, lng, fb.lat, fb.lng)
            });
          }
        }
        combined.sort((a, b) => a.distanceKm - b.distanceKm);
        setNearbyHospitals(combined);
      }
    } catch (e) {
      console.error('Error loading hospitals:', e);
    } finally {
      setIsLoadingHospitals(false);
    }
  }, []);

  // Request browser live GPS location
  const requestLiveLocation = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const addr = await reverseGeocode(lat, lng);
          const newLoc: UserLocation = {
            lat,
            lng,
            address: addr,
            isLiveGps: true,
            timestamp: Date.now()
          };
          setUserLocation(newLoc);
          saveUserLocation(newLoc);
          await loadHospitals(lat, lng);
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (err) => {
        setIsLoadingLocation(false);
        let msg = 'Unable to retrieve your location.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission denied. Please allow location access or type your city/district.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = 'Location position unavailable. Please type your city/pincode.';
        } else if (err.code === err.TIMEOUT) {
          msg = 'Location request timed out. Please try again or type your city.';
        }
        setLocationError(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }, [loadHospitals]);

  // Set location manually via city/district/pincode search
  const setManualLocation = useCallback(async (query: string): Promise<boolean> => {
    if (!query.trim()) return false;
    setIsLoadingLocation(true);
    setLocationError(null);
    try {
      const res = await searchLocation(query);
      if (res) {
        const newLoc: UserLocation = {
          lat: res.lat,
          lng: res.lng,
          address: res.displayName,
          isLiveGps: false,
          timestamp: Date.now()
        };
        setUserLocation(newLoc);
        saveUserLocation(newLoc);
        await loadHospitals(res.lat, res.lng);
        setIsLoadingLocation(false);
        return true;
      } else {
        setLocationError('Could not find location. Please check spelling or enter district name.');
        setIsLoadingLocation(false);
        return false;
      }
    } catch (e) {
      setLocationError('Error searching location.');
      setIsLoadingLocation(false);
      return false;
    }
  }, [loadHospitals]);

  // Launch Google Maps search for hospitals around the user's active coordinates
  const openGoogleMapsNearMe = useCallback(() => {
    const url = `https://www.google.com/maps/search/hospitals+near+me/@${userLocation.lat},${userLocation.lng},13z`;
    window.open(url, '_blank');
  }, [userLocation]);

  const refreshHospitals = useCallback(async () => {
    await loadHospitals(userLocation.lat, userLocation.lng);
  }, [loadHospitals, userLocation]);

  // Initial attempt: If saved location is default and permission has already been granted previously or prompt can be shown
  useEffect(() => {
    loadHospitals(userLocation.lat, userLocation.lng);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        isLoadingLocation,
        locationError,
        nearbyHospitals,
        isLoadingHospitals,
        requestLiveLocation,
        setManualLocation,
        openGoogleMapsNearMe,
        refreshHospitals
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
