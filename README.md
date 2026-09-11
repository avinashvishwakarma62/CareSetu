# CareSetu 🏥

### Affordable Healthcare & Health Awareness Platform for Rural Communities

CareSetu is a modern healthcare awareness and assistance platform designed to help people, especially those living in rural and underserved communities, access reliable health information, affordable healthcare resources, government schemes, emergency guidance, medicine information, and other essential healthcare services.

The platform brings multiple healthcare-related resources together in one simple and accessible interface.

---

## 🌟 Features

### 🩺 Healthcare Assistance
- Affordable healthcare information
- Healthcare service discovery
- Healthcare facility map
- Location-based healthcare support

### 💊 Affordable Medicine
- Information about affordable medicines
- Medicine-related awareness
- Helpful healthcare resources

### 🩸 Blood Donor Support
- Blood donor information
- Blood group-based donor assistance
- Emergency blood support resources

### 🚑 Emergency First Aid
- Basic emergency first-aid guidance
- Quick access to essential emergency information

### 🤖 AI Health Assistant
- AI-powered health information assistance
- Interactive health-related conversations
- Powered by Google Gemini API

> The AI assistant is intended for educational and informational purposes only and should not replace professional medical advice.

### 🧠 Health Awareness
- Health awareness resources
- Preventive healthcare information
- Common health-related topics

### 👩‍🍼 Women & Child Health
- Women health awareness
- Child health information
- Maternal and child healthcare resources

### 👴 Elderly Care
- Healthcare awareness for elderly people
- Elderly care information and resources

### 🏛️ Government Schemes
- Information about healthcare-related government schemes
- Awareness of available public welfare resources

### 📝 Health Quiz
- Interactive health awareness quizzes
- Educational questions and answers

### 🔍 Myth Buster
- Common healthcare myths
- Evidence-based awareness and clarification

### 📄 Report Simplifier
- Simplified explanation of complex healthcare reports
- Designed to make health information easier to understand

### 🌐 Multilingual Support
- Multiple language support
- Accessible interface for users from different backgrounds

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Recharts
- Motion

### Backend
- Node.js
- Express.js
- TypeScript
- TSX
- esbuild

### AI
- Google Gemini API
- `@google/genai`

### Development Tools
- VS Code
- Git
- GitHub
- npm

---

## 📂 Project Structure

```text
CareSetu/
│
├── src/
│   ├── components/
│   │   ├── modules/
│   │   ├── AudioPlayerButton.tsx
│   │   ├── DisclaimerBanner.tsx
│   │   ├── Header.tsx
│   │   ├── Home.tsx
│   │   └── Navigation.tsx
│   │
│   ├── context/
│   │   └── LocationContext.tsx
│   │
│   ├── data/
│   │   ├── mockData.ts
│   │   └── translations.ts
│   │
│   ├── services/
│   │   └── locationService.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── server.ts
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
└── README.md
