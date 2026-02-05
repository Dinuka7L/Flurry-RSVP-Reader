Rapid Serial Visual Presenter (RSVP) Web App
Overview

The Rapid Serial Visual Presenter (RSVP) Web App is a high-performance reading tool designed to help users read text at ultra-fast speeds, up to 600–700 words per minute. Inspired by the RSVP technique used in speed reading research, this web app allows users to focus on one word at a time, minimizing eye movement and improving reading efficiency.

Why This App Was Created

Traditional reading involves scanning lines and performing rapid eye movements (saccades), which can slow reading speed and reduce comprehension for large volumes of text. This app was created to:

Allow focused reading at high speeds without distractions.

Help learners, professionals, and students process large text quickly.

Provide a modern, clean web interface for accessing PDF or text files directly.

Offer customizable reading experiences: adjustable speed, font size, and ORP highlighting.

What is RSVP?

Rapid Serial Visual Presentation (RSVP) is a reading technique that displays words one at a time at a fixed position on the screen. Key benefits:

Reduced Eye Movement: No need for horizontal saccades, allowing faster word recognition.

Targeted Attention: Words appear at a consistent point, enhancing focus and comprehension.

ORP Highlighting: Optimal Recognition Point (ORP) is highlighted to help your eyes naturally center on each word.

Speed Customization: Speeds can range from slow (100 WPM) to ultra-fast (1000 WPM).

Features

Upload PDF or plain text files (up to 4–5 MB).

Adjustable reading speed (100–1000 words per minute).

Font size slider for readability on mobile and desktop.

Toggle ORP highlighting with vertical guide lines for precise word focus.

Light and dark themes.

Clean, mobile-first UI with responsive design.

Technical Architecture
1. Frontend

Framework: React (TypeScript)

UI & Styling: TailwindCSS for fast, responsive layouts

Components:

Reader: Handles word playback and RSVP display.

RSVPDisplay: Displays the current word with ORP highlighting and vertical guide lines.

Controls: Provides playback controls, speed slider, font size slider, and ORP toggle.

Upload: Handles PDF or text file upload and word extraction.

ThemeToggle: Switches between light and dark themes.

2. State Management

Local state using React hooks (useState, useEffect) for:

Current word index

Playback status (playing/paused)

Words per minute (WPM)

Font size

ORP visibility

Theme

LocalStorage persistence for user preferences (WPM, font size, ORP toggle, theme).

3. RSVP Word Display Logic

ORP Calculation: Finds the optimal recognition point for each word using findORP.

Word Centering: Words are horizontally centered based on ORP using transform: translateX.

Vertical Guide Lines: Two lines extending above and below the ORP letter for visual stability.

Animation: Smooth word transitions with word-change class for fade-in effects.

4. Controls & User Interaction

Play / Pause / Restart

Skip forward/backward by 10 words

Adjust speed (WPM)

Adjust font size dynamically

Toggle ORP highlighting

Exit reader

5. File Handling

Text extraction from uploaded PDF or text files.

Word array generation for RSVP playback.

Maximum file size: 4–5 MB.

6. Deployment

Vite for fast builds and hot module replacement during development.

GitHub Pages deployment for public hosting.

Relative paths and base configuration in vite.config.ts for GitHub Pages compatibility.

Folder Structure
rsvp-webapp/
├─ public/
│  ├─ favicon-flurry-logo.png
├─ src/
│  ├─ components/
│  │  ├─ Reader.tsx
│  │  ├─ RSVPDisplay.tsx
│  │  ├─ Controls.tsx
│  │  ├─ Upload.tsx
│  │  └─ ThemeToggle.tsx
│  ├─ hooks/
│  │  └─ useTheme.ts
│  ├─ utils/
│  │  └─ textProcessor.ts
│  ├─ App.tsx
│  └─ main.tsx
├─ package.json
├─ vite.config.ts
└─ README.md

Getting Started
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

Notes

Ensure uploaded PDFs are text-based, not image scans.

Maximum upload size: 4–5 MB.

Works best on modern browsers: Chrome, Firefox, Edge, Safari.

Optimized for both desktop and mobile devices.