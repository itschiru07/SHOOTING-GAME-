# 🚀 Space Shooter Lite

A lightweight, component-driven space shooter arcade game built using **React 19** and **Vite**. Navigate your spaceship, dodge and destroy incoming alien invaders, and aim for the high score!

---

## 🌌 About the Project

**Space Shooter Lite** is a classic retro-arcade inspired game designed for browsers. It uses a modern component-driven architecture built in React, allowing for modular control of game state, scoreboards, game boards, enemy waves, and rendering logic. It features responsive design supporting both light and dark modes based on user system preferences.

---

## 🛠️ Technology Stack

- **Framework:** [React 19](https://react.dev/)
- **Bundler & Build Tool:** [Vite 8](https://vite.dev/)
- **Styling:** Custom CSS variables for clean layout and performance, with native dark mode support (`prefers-color-scheme`)
- **Icons & Visuals:** Retro emoji designs for instant, cross-platform compatibility without heavy asset loading

---

## 🧱 Component Architecture

The game codebase is structured into self-contained React components:

- **[App.jsx](src/App.jsx):** The core application container orchestrating the game state.
- **[Header.jsx](src/components/Header.jsx):** Renders the title and developer information.
- **[GameBoard.jsx](src/components/GameBoard.jsx):** The active play area managing collision grids and rendering active entities.
- **[Spaceship.jsx](src/components/Spaceship.jsx):** The player's space vessel with movement handlers.
- **[Enemy.jsx](src/components/Enemy.jsx):** Handles movement patterns, shapes, and counts of incoming hostiles.
- **[scoreboard.jsx](src/components/scoreboard.jsx):** Real-time score display updating on enemy destruction.
- **[Control.jsx](src/components/Control.jsx):** Key and pointer listeners for player interactions (under active development).
- **[Gameover.jsx](src/components/Gameover.jsx):** End game modal with replay triggers (under active development).

---

## 📁 Project Structure

```bash
space-shooter-lite/
├── public/                 # Static assets (images, audio, etc.)
├── src/
│   ├── assets/             # Game graphic assets and styles
│   ├── components/         # Modular React components
│   │   ├── Control.jsx
│   │   ├── Enemy.jsx
│   │   ├── GameBoard.jsx
│   │   ├── Gameover.jsx
│   │   ├── Header.jsx
│   │   ├── Spaceship.jsx
│   │   └── scoreboard.jsx
│   ├── App.css             # Component-level styles
│   ├── App.jsx             # Main game entry and layout
│   ├── index.css           # Global variables and resets
│   └── main.jsx            # React client DOM mount script
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

Follow these steps to run a local copy of the game for development and testing.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18.0.0 or higher recommended).

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/space-shooter-lite.git
   ```
2. Navigate into the project folder:
   ```bash
   cd space-shooter-lite
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To compile static optimized production files into the `/dist` directory:
```bash
npm run build
```

---

## 🎮 How to Play (Gameplay Controls)

- **Move Left / Right:** Use `A`/`D` keys or `Left`/`Right` Arrow keys.
- **Shoot lasers:** Press the `Spacebar`.
- **Objective:** Destroy as many incoming virus clusters (`🦠`) as possible while avoiding collision.

---

## 🌟 Future Roadmap

- [ ] Implement collision detection algorithm for lasers and enemies.
- [ ] Connect game loops with keyboard inputs inside `Control.jsx`.
- [ ] Implement progressive difficulty scaling (enemies accelerate over time).
- [ ] Add retro synth sound effects and explosion animations.
- [ ] Save top high scores to local storage.
