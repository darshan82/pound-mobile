# Pound — Mobile App (React Native)

Cross-platform mobile app for **Pound**, a platform that gamifies fitness for gamers. Players create an account and a personalised 3D avatar, set up their fitness profile, then take on daily fitness challenges, log progress in a journal, earn tokens and compete on individual and team leaderboards. Health data from Apple Health is synced to track activity.

Companion web sign-up: [pound-landing-page](https://github.com/darshan82/pound-landing-page)

![React Native](https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React Navigation](https://img.shields.io/badge/React_Navigation-6B52AE?logo=react&logoColor=white)
![NativeBase](https://img.shields.io/badge/NativeBase-1A202C?logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?logo=apple&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)

## Features

- **Onboarding flow** – sign up / login, password setup, unique player tag, body type, weight & gender, location and favourite games
- **3D avatar creation** with Ready Player Me (embedded WebView) and an editable avatar screen
- **Fitness challenges** – daily challenges with embedded YouTube workout videos, progress tracking and completion
- **Journal & dashboard** – history of completed challenges, progress screen with circular progress indicators
- **Oracle** – fitness guidance section backed by its own API
- **Leaderboards** – individual and team rankings
- **Tokens** – token balance shown on the player dashboard
- Settings / profile management, plus early UI for Wallet and Chat screens
- **Wearables** – Apple Health integration (`react-native-health`) synced through the Rook Connect API
- Navigation with stack, bottom tab, top tab and drawer navigators

## Tech stack

| Area        | Tools                                                                 |
| ----------- | --------------------------------------------------------------------- |
| Mobile      | React Native 0.72, React 18, TypeScript                               |
| Navigation  | React Navigation (native stack, bottom tabs, material top tabs, drawer) |
| UI          | NativeBase, Linear Gradient, Modal, circular progress indicators      |
| Forms/state | Formik, React Context                                                 |
| Data        | Axios, AsyncStorage                                                   |
| Integrations| Ready Player Me, YouTube iframe, Apple HealthKit, Rook Connect        |

## Project structure

```
src/
├── app/config/       # API clients (Pound, Oracle, Rook Connect) and env config
├── context/          # Global app state
├── modules/          # Feature modules: login, signup, dashboard, wearables
├── newDesigns/
│   ├── screens/      # All app screens (onboarding, challenges, journal, leaderboards, …)
│   ├── components/   # Shared UI components
│   └── routes/       # Navigation setup
└── interfaces/       # TypeScript types
```

## Getting started

**Requirements:** Node.js 18+, Yarn, React Native CLI environment ([setup guide](https://reactnative.dev/docs/environment-setup)), Xcode and/or Android Studio

```bash
git clone https://github.com/darshan82/pound-mobile.git
cd pound-mobile
yarn install
cp src/app/config/env.example.ts src/app/config/env.ts   # add your API URLs and keys
```

Run on iOS:

```bash
cd ios && pod install && cd .. && yarn ios
```

Run on Android:

```bash
yarn android
```

### Configuration

API URLs and keys live in `src/app/config/env.ts`, which is git-ignored. See [`env.example.ts`](src/app/config/env.example.ts) for the required values.

## Author

**Darshan Lal** — Full-Stack Developer
[Portfolio](https://darshan-portfolio-one.vercel.app/) · [GitHub](https://github.com/darshan82)
