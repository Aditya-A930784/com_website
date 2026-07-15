# CSMC Mobile App (Expo WebView wrapper)

This is a small Expo app that loads the existing website in a `WebView` for quick mobile testing and publishing.

Quick start

1. Install dependencies:

```bash
cd csnmahanagarpalika/mobile-app
npm install
```

2. Make sure the web dev server is running in the project root:

```bash
cd ../
npm run dev
```

3. Start Expo:

```bash
cd csnmahanagarpalika/mobile-app
npx expo start
```

Notes
- Android emulator: the app uses `http://10.0.2.2:3000` to reach the host `localhost:3000`.
- Physical devices: replace the URL in `App.js` with your machine IP (e.g. `http://192.168.1.5:3000`).
- For a more native experience, plan a phased migration of key screens to React Native.
