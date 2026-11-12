
# VoiceForAll 🌍

### Regional Language Content Creator for Everyone

VoiceForAll is a React Native mobile application designed to make important information accessible to people who face difficulties reading text-based content.

The application converts text-based information into speech in multiple Indian regional languages, helping users access useful information through audio.

## 🎯 Project Objective

To make information more accessible by reducing language and literacy barriers, particularly in areas such as agriculture, healthcare, government schemes and education.

## ✨ Key Features

- **Multilingual Support:** English, Hindi, Malayalam, Tamil, Telugu, Marathi and Bengali.
- **Text-to-Speech:** Converts written content into audio using React Native TTS.
- **Agriculture Information:** Provides accessible farming-related information.
- **Healthcare Information:** Makes useful health information available through audio.
- **Government Schemes:** Helps users access information about government initiatives.
- **Education:** Provides educational content in regional languages.
- **Offline-First Approach:** Uses locally stored JSON content when internet connectivity is unavailable.
- **Local Caching:** Uses AsyncStorage to improve content accessibility.
- **Cloud Integration:** Uses Firebase Firestore for cloud-based data synchronization.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React Native CLI | Mobile application development |
| TypeScript | Application logic |
| React Native TTS | Text-to-speech functionality |
| Firebase Firestore | Cloud database and synchronization |
| AsyncStorage | Local data storage and caching |
| JSON | Offline content management |

## 🏗️ Application Architecture

VoiceForAll follows an offline-first approach.

- Local JSON files provide fallback content.
- AsyncStorage maintains locally cached information.
- Firebase Firestore supports cloud data synchronization.
- React Native TTS converts available text content into speech.

## 🌐 Supported Languages

- English
- Hindi
- Malayalam
- Tamil
- Telugu
- Marathi
- Bengali

## 🚀 Getting Started

### Prerequisites

- Node.js
- React Native development environment
- Android Studio and Android SDK
- JDK 17

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jishnu-77/VoiceForAll.git
   ```

2. Navigate to the project directory:

   ```bash
   cd VoiceForAll
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start Metro:

   ```bash
   npm start
   ```

5. Run the Android application in another terminal:

   ```bash
   npm run android
   ```

## 👨‍💻 Developed By

**Jishnu V**

MCA Graduate | AI & Machine Learning

GitHub: https://github.com/jishnu-77

---

*VoiceForAll – Making information accessible through language and voice.*
