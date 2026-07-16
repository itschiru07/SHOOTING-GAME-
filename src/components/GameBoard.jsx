import Spaceship from "./Spaceship";
import Enemy from "./Enemy";
import Laser from "./Laser";

function GameBoard({ shipPosition, enemies = [], lasers = [], particles = [] }) { 
  return (
    <div className="game-board">
      {/* Background Starfield Grid */}
      <div className="stars-layer"></div>
      <div className="grid-lanes">
        <div className="grid-lane-line left-line"></div>
        <div className="grid-lane-line right-line"></div>
      </div>

      {/* Enemies */}
      {enemies.map((enemy) => (
        <Enemy
          key={enemy.id}
          lane={enemy.lane}  
          y={enemy.y}
          type={enemy.type || 0}
        />
      ))}

      {/* Laser Projectiles */}
      {lasers.map((laser) => (
        <Laser
          key={laser.id}
          lane={laser.lane}
          y={laser.y}
        />
      ))}

      {/* Particle Explosions */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: "50%",
            boxShadow: `0 0 10px ${p.color}`,
            opacity: p.opacity,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            transition: "opacity 0.05s linear"
          }}
        />
      ))}
      
      {/* Player Spacecraft */}
      <Spaceship shipPosition={shipPosition} />
    </div>
  );
}

export default GameBoard;