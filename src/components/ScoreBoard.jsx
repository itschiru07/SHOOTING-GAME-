import { useState } from "react";
import { audioSynth } from "../utils/AudioController";

function ScoreBoard({ score, highScore, time, crossedCount, difficulty, setDifficulty }) {
  const [audioOn, setAudioOn] = useState(false);

  const toggleAudio = () => {
    const nextState = !audioOn;
    setAudioOn(nextState);
    audioSynth.toggle(nextState);
    if (nextState) {
      audioSynth.playClick();
    }
  };

  const changeDifficulty = (diff) => {
    setDifficulty(diff);
    audioSynth.playClick();
  };

  return (
    <div className="scoreboard-wrapper">
      <div className="Score-board">
        <div className="stat-card">
          <span className="stat-label">HIGH SCORE</span>
          <span className="stat-value neon-text-blue">{highScore}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">SCORE</span>
          <span className="stat-value neon-text-purple">{score}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">TIME</span>
          <span className="stat-value neon-text-green">{time}s</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">MISSED</span>
          <span className={`stat-value ${crossedCount >= 3 ? "neon-text-red" : "neon-text-orange"}`}>
            {crossedCount} / 3
          </span>
        </div>
      </div>
      
      <div className="difficulty-row">
        <div className="difficulty-selector">
          <span className="control-label">DIFFICULTY:</span>
          <button
            className={difficulty === "easy" ? "active easy" : "easy"}
            onClick={() => changeDifficulty("easy")}
          >
            EASY
          </button>
          <button
            className={difficulty === "medium" ? "active medium" : "medium"}
            onClick={() => changeDifficulty("medium")}
          >
            MEDIUM
          </button>
          <button
            className={difficulty === "hard" ? "active hard" : "hard"}
            onClick={() => changeDifficulty("hard")}
          >
            HARD
          </button>
        </div>

        <button className={`audio-toggle ${audioOn ? "on" : "off"}`} onClick={toggleAudio}>
          {audioOn ? "🔊 SOUND ON" : "🔇 SOUND OFF"}
        </button>
      </div>
    </div>
  );
}

export default ScoreBoard;