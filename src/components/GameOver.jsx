import { useEffect } from "react";
import { audioSynth } from "../utils/AudioController";

function GameOver({ score, highScore, missed, timeLeft, onRestart }) {
  useEffect(() => {
    // Play retro game over tune once on mount
    audioSynth.playGameOver();
  }, []);

  const isWin = timeLeft <= 0 && missed < 3;

  return (
    <div className="game-over-container">
      <div className="game-over-card">
        <h2 className="game-over-title neon-text-red">
          {isWin ? "MISSION COMPLETE!" : "GAME OVER"}
        </h2>
        
        <p className="game-over-subtitle">
          {isWin 
            ? "You successfully defended the sector!" 
            : "The alien swarm breached your defense line!"}
        </p>

        <div className="game-over-stats">
          <div className="stat-row">
            <span>Final Score:</span>
            <strong className="neon-text-purple">{score}</strong>
          </div>
          <div className="stat-row">
            <span>High Score:</span>
            <strong className="neon-text-blue">{highScore}</strong>
          </div>
          <div className="stat-row">
            <span>Shuttles Missed:</span>
            <strong className={missed >= 3 ? "text-red" : "text-orange"}>{missed} / 3</strong>
          </div>
          <div className="stat-row">
            <span>Time Survived:</span>
            <strong>{60 - timeLeft}s</strong>
          </div>
        </div>

        <button 
          className="restart-btn" 
          onClick={() => {
            audioSynth.playClick();
            onRestart();
          }}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}

export default GameOver;