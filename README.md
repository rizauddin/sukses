# Sukses

**A simple Pomodoro timer for focused work, one session at a time.**

Sukses is a minimalist, mobile-friendly Progressive Web App (PWA) that helps you focus, take regular breaks and celebrate your progress. It runs in your browser and can be added to your phone's Home Screen.

**Try Sukses:** [rizauddin.github.io/sukses](https://rizauddin.github.io/sukses/)

> Sukses is designed to work without an account or server-side storage. Your progress is kept locally on your device.

## Features

- **Pomodoro timer:** Focus, short-break and long-break sessions with adjustable durations.
- **Personal welcome:** Enter your name or nickname, or use a suggested nickname.
- **Stars and achievements:** Earn a star for each completed focus session and unlock milestone badges.
- **Daily progress:** See completed sessions and progress through your Pomodoro cycle.
- **Optional automatic transitions:** Choose whether breaks and subsequent focus sessions start automatically, if enabled in your version of Sukses.
- **Optional sounds:** Clock ticking and completion notifications, with volume controls where supported by the current release.
- **English and Bahasa Melayu:** Choose your preferred interface language.
- **Light and dark themes:** Match your device or select a theme manually.
- **Local backup:** Export and import your progress as JSON.
- **Installable and offline-capable:** Use Sukses as a PWA after its required assets have been cached.

## How to use

1. Open [Sukses](https://rizauddin.github.io/sukses/).
2. On your first visit, enter a name or nickname, choose a suggested name, or skip.
3. Select **Focus** and press **Start**.
4. When a session finishes, take a break and continue with your next session.
5. Check **Achievements** to see stars and badges, or open **Settings** to customise your experience.

The standard durations are **25 minutes** for focus, **5 minutes** for a short break and **15 minutes** for a long break. You can adjust them in Settings.

## Install Sukses

### iPhone / iPad

1. Open the app in **Safari**.
2. Tap **Share** and choose **Add to Home Screen**.
3. Follow the on-screen instructions to add or open it as a web app.

### Android

1. Open the app in **Chrome** or another browser with PWA installation support.
2. Open the browser menu and select **Install app** or **Add to Home screen**, if available.
3. Follow the installation prompts.

### Desktop

Open the app in a compatible browser. Depending on the browser, an install option may be available in the address bar or menu.

Installation options vary by device and browser.

## Privacy and data

Sukses does **not require sign-up** and does not use cloud synchronisation. Your nickname, settings, timer state and achievements are stored locally using browser storage.

- Your data does **not automatically sync** between devices or browsers.
- Clearing site data, uninstalling the app or moving to another device may remove saved progress.
- Use **Settings → Backup / Export** to save a JSON backup before clearing data or changing devices.
- A browser tab and an installed PWA may use different storage contexts on some platforms.

## Offline use and notifications

Sukses uses a service worker to cache its application files for offline use. Open the app online first and allow its assets to cache before relying on it offline. Browser storage and caches can be cleared by the device or browser.

Timer recovery is designed to use elapsed time rather than assume JavaScript continues running in the background. However, **sound playback and notifications are not guaranteed** when a phone is locked, the browser suspends the app or the app is closed. Some browsers also require a tap before audio can play after reopening.

## Technology

Sukses is built with **vanilla HTML, CSS and JavaScript**, using browser APIs such as `localStorage`, the Web Audio API and service workers. There is no frontend framework or server requirement.

The published app consists of:

```text
index.html
manifest.webmanifest
sw.js
icons/
  apple-touch-icon.png
  icon-192.png
  icon-512.png
```

## Run locally

Clone the public repository and serve it over localhost:

```bash
git clone https://github.com/rizauddin/sukses.git
cd sukses
python3 -m http.server 8000
```

Open <http://localhost:8000/>. A local HTTP server is preferable to opening `index.html` directly because service workers need a supported secure context (localhost is supported).

## Feedback

Found a bug or have a suggestion? [Open an issue on GitHub](https://github.com/rizauddin/sukses/issues).

## Licence

Sukses is released under the **MIT Licence**. You may use, copy, modify and distribute the software, including for commercial purposes, provided that you retain the copyright and licence notice.

Copyright © 2026 Rizauddin Saian.

See the [LICENSE](LICENSE) file for the full terms. The Sukses name and branding are not separately licensed by this software licence.
