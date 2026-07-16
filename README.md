# Draft Desk — Post Composer with Platform Validation & Draft Management

Unit 1 / Experiment 1 implementation: a React + Vite frontend module for
composing social posts with per-platform validation and full draft
management (save, list, edit, delete), with a simulated backend layer.

## What's implemented

- **Controlled components** — `usePostForm` hook drives the textarea/select
  via React state (`src/hooks/usePostForm.js`)
- **Custom hooks** — `useDrafts` (CRUD + localStorage persistence),
  `usePostForm` (form + validation)
- **Strategy Design Pattern** — one validation function per platform,
  selected at runtime (`src/utils/validationStrategies.js`)
- **Platform business rules** — Twitter 280 / LinkedIn 3000 / Instagram 2200,
  defined in one place (`src/utils/platforms.js`)
- **Draft management** — save, list, edit, delete; persisted to
  `localStorage` so drafts survive a refresh
- **Mock API + retry logic** — `saveDraftMock` / `deleteDraftMock` simulate
  network latency and random failure; `retry()` reattempts up to 2 times
  before giving up (`src/utils/mockApi.js`, `src/utils/retry.js`)
- **Loading / error / success states** and **toast notifications**
  (`react-toastify`) surfaced on every save/delete
- **Real-time validation** with a character-limit gauge under the textarea

## Project structure

```
post-composer/
├─ index.html
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ components/
│  │  ├─ PostComposer.jsx
│  │  ├─ PlatformSelector.jsx
│  │  ├─ LimitGauge.jsx
│  │  ├─ DraftList.jsx
│  │  └─ DraftCard.jsx
│  ├─ hooks/
│  │  ├─ usePostForm.js
│  │  └─ useDrafts.js
│  ├─ utils/
│  │  ├─ platforms.js
│  │  ├─ validationStrategies.js
│  │  ├─ mockApi.js
│  │  └─ retry.js
│  └─ styles/
│     └─ index.css
```

---

## Running on Windows 11 — step by step

### 1. Install Node.js

You need Node.js 18 or newer (this gives you `npm` too).

1. Go to **https://nodejs.org** in your browser.
2. Download the **LTS** version for Windows (the `.msi` installer).
3. Run the installer, click **Next** through the defaults, and finish.
4. Confirm it worked — open **PowerShell** (Start menu → type `PowerShell`
   → Enter) and run:
   ```powershell
   node -v
   npm -v
   ```
   Both should print version numbers (e.g. `v20.x.x` and `10.x.x`). If you
   get "not recognized", restart PowerShell (or your PC) so PATH updates
   take effect.

### 2. Unzip the project

1. Right-click the downloaded `post-composer.zip`.
2. Choose **Extract All…**, pick a folder (e.g. `Documents\post-composer`),
   click **Extract**.

### 3. Open the project folder in PowerShell

```powershell
cd Documents\post-composer
```
(adjust the path to wherever you extracted it)

### 4. Install dependencies

```powershell
npm install
```

This downloads React, Vite, and `react-toastify` into a new
`node_modules` folder. It needs an internet connection and takes a minute
or two.

### 5. Start the dev server

```powershell
npm run dev
```

You'll see output like:

```
  VITE ready in 400 ms

  ➜  Local:   http://localhost:5173/
```

Your browser should open automatically. If it doesn't, hold **Ctrl** and
click the `http://localhost:5173/` link, or paste it into your browser.

### 6. Use the app

- Pick a platform, write a post, watch the character gauge and validation
  update live.
- Click **Save draft** — it runs through the mock API (with a short
  simulated delay and occasional simulated failure/retry) and shows a
  toast notification.
- Saved drafts appear on the right as cards. **Edit** loads a draft back
  into the composer; **Delete** removes it (also via the mock API).
- Drafts persist in your browser's `localStorage`, so they survive a page
  refresh.

### 7. Stop the server

Back in PowerShell, press **Ctrl + C**, then confirm if asked.

### Optional: production build

```powershell
npm run build
npm run preview
```

`npm run build` outputs a static, optimized build into a `dist/` folder;
`npm run preview` serves that build locally so you can check it before
deploying anywhere.

---

## Troubleshooting

- **`npm : File cannot be loaded because running scripts is disabled`**
  (PowerShell execution policy error) — run PowerShell **as Administrator**
  and execute:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```
  then retry `npm install`.
- **Port 5173 already in use** — close whatever's using it, or run
  `npm run dev -- --port 3000` to use a different port.
- **Blank page / errors in browser console** — make sure `npm install`
  finished without errors, then stop (Ctrl+C) and re-run `npm run dev`.
