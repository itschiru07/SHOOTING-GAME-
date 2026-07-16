import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import Controls from "./components/Controls";
import { audioSynth } from "./utils/AudioController";

const INITIAL_ENEMIES = [{ id: 1, lane: 0, y: 10, type: 0 }];

const DIFFICULTY_SETTINGS = {
  easy: { spawnInterval: 900, speed: 1.0, laserSpeed: 3.0, fireCooldown: 250 },
  medium: { spawnInterval: 500, speed: 1.6, laserSpeed: 4.2, fireCooldown: 180 },
  hard: { spawnInterval: 280, speed: 2.4, laserSpeed: 5.5, fireCooldown: 130 },
};

function App() {
  // Game states
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("space_shooter_high_score");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [time, setTime] = useState(60);
  const [shipPosition, setShipPosition] = useState(1); // 0 = left, 1 = center, 2 = right
  const [enemies, setEnemies] = useState(INITIAL_ENEMIES);
  const [lasers, setLasers] = useState([]);
  const [particles, setParticles] = useState([]);
  const [crossedCount, setCrossedCount] = useState(0);
  const [difficulty, setDifficulty] = useState("medium");
  const [isShooting, setIsShooting] = useState(false);

  const isGameOver = time <= 0 || crossedCount >= 3;

  // References for game loop to avoid stale closures
  const stateRef = useRef({
    shipPosition,
    enemies,
    lasers,
    particles,
    crossedCount,
    difficulty,
    isShooting,
    time,
  });

  const lastShotTimeRef = useRef(0);
  const pendingShotsRef = useRef(0);

  const triggerShot = useCallback(() => {
    if (isGameOver) return;
    pendingShotsRef.current += 1;
  }, [isGameOver]);

  // Sync state values to ref on every change
  useEffect(() => {
    stateRef.current = {
      shipPosition,
      enemies,
      lasers,
      particles,
      crossedCount,
      difficulty,
      isShooting,
      time,
    };
  }, [shipPosition, enemies, lasers, particles, crossedCount, difficulty, isShooting, time]);


  // Move left
  const moveLeft = useCallback(() => {
    if (isGameOver) return;
    setShipPosition((prev) => (prev > 0 ? prev - 1 : prev));
  }, [isGameOver]);

  // Move right
  const moveRight = useCallback(() => {
    if (isGameOver) return;
    setShipPosition((prev) => (prev < 2 ? prev + 1 : prev));
  }, [isGameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGameOver) return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        moveLeft();
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        moveRight();
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault(); // prevent page scrolling
        if (!stateRef.current.isShooting) {
          triggerShot();
          setIsShooting(true);
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === " " || e.key === "Spacebar") {
        setIsShooting(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isGameOver, moveLeft, moveRight, triggerShot]);

  // Main game tick update loop (runs at ~60 FPS / 16ms interval)
  useEffect(() => {
    if (isGameOver) return;

    const gameTick = setInterval(() => {
      const current = stateRef.current;
      const settings = DIFFICULTY_SETTINGS[current.difficulty];

      // 1. Handle shooting cooldown and spawning lasers
      let newLaser = null;
      if ((current.isShooting || pendingShotsRef.current > 0) && Date.now() - lastShotTimeRef.current >= settings.fireCooldown) {
        newLaser = { id: Date.now() + Math.random(), lane: current.shipPosition, y: 80 };
        audioSynth.playLaser();
        lastShotTimeRef.current = Date.now();
        pendingShotsRef.current = 0; // Reset pending shot
      }

      // 2. Update laser positions (moving UP), including the newly created laser
      const baseLasers = newLaser ? [...current.lasers, newLaser] : current.lasers;
      let activeLasers = baseLasers
        .map((laser) => ({ ...laser, y: laser.y - settings.laserSpeed }))
        .filter((laser) => laser.y > 0);

      // 3. Update enemy positions (moving DOWN)
      let crossedThisTick = 0;
      let activeEnemies = current.enemies
        .map((enemy) => {
          const nextY = enemy.y + settings.speed;
          if (nextY >= 90 && enemy.y < 90) {
            crossedThisTick += 1;
          }
          return { ...enemy, y: nextY };
        })
        .filter((enemy) => {
          // If the enemy reaches the bottom, filter it out
          return enemy.y < 95;
        });

      if (crossedThisTick > 0) {
        setCrossedCount((prev) => prev + crossedThisTick);
      }

      // 4. Update particles (fading out and moving)
      let activeParticles = current.particles
        .map((p) => ({
          ...p,
          x: p.x + p.dx,
          y: p.y + p.dy,
          opacity: p.opacity - 0.05,
        }))
        .filter((p) => p.opacity > 0);

      // 5. Collision Detection
      const survivingEnemies = [];
      const survivingLasers = [...activeLasers];
      const explodedParticles = [];
      let scoreIncrement = 0;

      // Map lane index (0, 1, 2) to actual percentage center X coordinate for particles
      const laneXCoords = [15, 50, 85];

      for (let enemy of activeEnemies) {
        let hit = false;
        // Check if any laser is in the same lane and within collision proximity of Y coordinate
        for (let i = 0; i < survivingLasers.length; i++) {
          const laser = survivingLasers[i];
          if (laser.lane === enemy.lane && Math.abs(laser.y - enemy.y) < 6) {
            // Collision detected!
            hit = true;
            survivingLasers.splice(i, 1); // remove laser
            scoreIncrement += 10;
            audioSynth.playExplosion();

            // Spawn explosion particles
            const enemyX = laneXCoords[enemy.lane];
            const enemyY = enemy.y;
            const colors = ["#ff007f", "#00ffff", "#ffff00", "#ffaa00", "#ffffff"];
            for (let pIdx = 0; pIdx < 12; pIdx++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = 0.5 + Math.random() * 2;
              explodedParticles.push({
                id: Date.now() + Math.random() + pIdx,
                x: enemyX,
                y: enemyY,
                dx: Math.cos(angle) * speed,
                dy: Math.sin(angle) * speed,
                size: 3 + Math.random() * 5,
                color: colors[pIdx % colors.length],
                opacity: 1.0,
              });
            }
            break;
          }
        }

        if (!hit) {
          survivingEnemies.push(enemy);
        }
      }

      if (scoreIncrement > 0) {
        setScore((prev) => prev + scoreIncrement);
      }

      // Update state arrays
      setLasers(survivingLasers);
      setEnemies(survivingEnemies);
      setParticles([...activeParticles, ...explodedParticles]);

    }, 20);

    return () => clearInterval(gameTick);
  }, [isGameOver]);

  // Spawn enemies continuously
  useEffect(() => {
    if (isGameOver) return;
    const intervalTime = DIFFICULTY_SETTINGS[difficulty].spawnInterval;
    const interval = setInterval(() => {
      setEnemies((prevEnemies) => {
        if (prevEnemies.length < 15) {
          return [
            ...prevEnemies,
            {
              id: Date.now() + Math.random(),
              y: -5, // spawn slightly above board viewport
              lane: Math.floor(Math.random() * 3),
              type: Math.floor(Math.random() * 4), // 4 different enemy types
            },
          ];
        }
        return prevEnemies;
      });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isGameOver, difficulty]);

  // Update and persist high score
  useEffect(() => {
    if (score > highScore) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHighScore(score);
      localStorage.setItem("space_shooter_high_score", score.toString());
    }
  }, [score, highScore]);

  // Timer countdown
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver]);

  const handleRestart = () => {
    setScore(0);
    setTime(60);
    setShipPosition(1);
    setCrossedCount(0);
    setLasers([]);
    setParticles([]);
    setEnemies(INITIAL_ENEMIES);
  };

  return (
    <div className="app">
      <Header />
      <ScoreBoard 
        score={score} 
        highScore={highScore}
        time={time} 
        crossedCount={crossedCount} 
        difficulty={difficulty} 
        setDifficulty={setDifficulty} 
      />
      <GameBoard 
        shipPosition={shipPosition} 
        enemies={enemies} 
        lasers={lasers} 
        particles={particles}
      />
      {!isGameOver ? (
        <Controls 
          moveLeft={moveLeft} 
          moveRight={moveRight} 
          triggerShot={triggerShot}
          startShooting={() => setIsShooting(true)} 
          stopShooting={() => setIsShooting(false)} 
        />
      ) : (
        <GameOver 
          score={score}
          highScore={highScore}
          missed={crossedCount}
          timeLeft={time}
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
}

export default App;
