import { audioSynth } from "../utils/AudioController";

function Controls({ moveLeft, moveRight, triggerShot, startShooting, stopShooting }) {
  const handleLeft = () => {
    audioSynth.playClick();
    moveLeft();
  };

  const handleRight = () => {
    audioSynth.playClick();
    moveRight();
  };

  return (
    <div className="controls">
      <button 
        className="ctrl-btn move-btn left"
        onClick={handleLeft}
        aria-label="Move Left"
      >
        ◀ LEFT
      </button>
      
      <button 
        className="ctrl-btn fire-btn"
        onMouseDown={() => {
          audioSynth.playClick();
          triggerShot();
          startShooting();
        }} 
        onMouseUp={stopShooting}
        onMouseLeave={stopShooting}
        onTouchStart={(e) => {
          e.preventDefault();
          audioSynth.playClick();
          triggerShot();
          startShooting();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          stopShooting();
        }}
      >
        🔥 FIRE
      </button>
      
      <button 
        className="ctrl-btn move-btn right"
        onClick={handleRight}
        aria-label="Move Right"
      >
        RIGHT ▶
      </button>
    </div>
  );
}

export default Controls;
