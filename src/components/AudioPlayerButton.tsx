import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Language } from '../types';

interface AudioPlayerButtonProps {
  text: string;
  language: Language;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  labelEn?: string;
  labelHi?: string;
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  text,
  language,
  size = 'md',
  className = '',
  labelEn = 'Listen',
  labelHi = 'आवाज में सुनें'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSupported) {
      alert(language === 'hi' ? 'आपके ब्राउज़र में आवाज़ (Voice) की सुविधा उपलब्ध नहीं है।' : 'Voice synthesis is not supported on this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9; // Slightly slower for clear rural understanding

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  if (!isSupported) return null;

  const sizeClasses = {
    sm: 'px-2 py-1 text-[11px] gap-1',
    md: 'px-3 py-1.5 text-xs gap-1.5',
    lg: 'px-4 py-2 text-sm gap-2'
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`inline-flex items-center rounded-xl font-bold transition-all shadow-xs cursor-pointer ${
        isPlaying
          ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
          : 'bg-teal-50 hover:bg-teal-100 text-[#028090] border border-teal-200'
      } ${sizeClasses[size]} ${className}`}
      title={isPlaying ? 'Stop Voice' : 'Listen Voice'}
    >
      {isPlaying ? (
        <>
          <VolumeX className={iconSizes[size]} />
          <span>{language === 'hi' ? 'रोकें' : 'Stop'}</span>
        </>
      ) : (
        <>
          <Volume2 className={`${iconSizes[size]} text-[#028090]`} />
          <span>{language === 'hi' ? labelHi : labelEn}</span>
        </>
      )}
    </button>
  );
};
