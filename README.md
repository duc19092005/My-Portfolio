# Trần Anh Đức - Backend Developer Portfolio

A responsive, high-tech, space-themed developer portfolio built for **Trần Anh Đức (Intern Backend Developer)**. The interface features a custom interactive telemetry design inspired by sci-fi dashboards and relativistic physics, running on a permanent dark theme locked to deep space.

---

## 🌌 Core Features

1. **Relativistic Gravitational Well (About Section):** 
   - A custom simulation of a black hole (inspired by Gargantua) utilizing a warped space-time coordinate grid.
   - Interactive revolving planets representing core backend skills (`.NET` & `Node.js`) that orbit the event horizon using 3D depth projections and orbital speeds based on relativity.
2. **Interactive Constellation Map (Skills Section):**
   - A custom-drawn star chart (Andromeda, Orion, Vega, Pulsar constellations) connecting core technologies.
   - Hover and click states highlighting respective developer details instantly.
3. **Artifact Dossier Carousel (Projects Section):**
   - A horizontal slide-out catalog showcasing project telemetry logs.
   - Responsive card layouts supporting drag, indicators, and manual controls.
4. **Scroll Snapping & Coordinate Tracking:**
   - Unified keyboard (`ArrowUp`/`ArrowDown`) and scroll-wheel hijacking logic that snaps cleanly to viewport sections.
   - Interactive float coordinates pointing to astronomical celestial systems (`RA 12h 45m 0s | Dec -28° 22' 54"`).
5. **Interactive Telemetry Cursor:**
   - Smooth spring physics driven cursor tracker that reacts dynamically when hovering over input modules, textareas, and navigation buttons.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4 + Vanilla CSS Custom Overlays
- **Animations:** Motion (Framer Motion)
- **Icons:** `@tabler/icons-react`

---

## 📂 Codebase Structure

```
├── public/                 # Static assets & PDF documents
└── src/
    ├── components/         # Interactive UI Modules
    │   ├── About.tsx       # Bio & Gravity Well Orbital System
    │   ├── Achievements.tsx # Award credentials
    │   ├── Contact.tsx     # Terminal mail dispatch form
    │   ├── CustomCursor.tsx # Spring-physics custom cursor
    │   ├── Footer.tsx      # Astronomy log coordinates
    │   ├── GalaxyBackground.tsx # HTML5 Canvas particle renderer
    │   ├── Hero.tsx        # Main display terminal
    │   ├── Navbar.tsx      # Core header
    │   ├── Projects.tsx    # Dossier card carousel
    │   ├── SideNav.tsx     # Float bullet coordinates
    │   └── Skills.tsx      # Constellation star charts
    ├── App.tsx             # Entry module & Snap-scroll coordinator
    ├── index.css           # Global typography & root variables
    └── main.tsx            # DOM initialization
```

---

## 🚀 Setup & Execution

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) and `npm` installed.

### 2. Installation
Install project dependencies:
```bash
npm install
```

### 3. Local Development Server
Start the Vite development server locally:
```bash
npm run dev
```

### 4. Build Production Bundle
Build the optimized production bundle:
```bash
npm run build
```
The compiled files will be output to the `dist/` directory, ready for hosting.
