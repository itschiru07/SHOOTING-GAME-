function Enemy({ lane = 1, y = 10, type = 0 }) {
  const positions = ["15%", "50%", "85%"];
  const leftPos = positions[lane];

  // Map type to emoji for visual variety
  const enemyEmojis = ["🛸", "👾", "👽", "🐙"];
  const emoji = enemyEmojis[type % enemyEmojis.length];

  return (
    <div
      className="enemy-sprite"
      style={{
        position: "absolute",
        top: `${y}%`,
        left: leftPos,
        transform: "translate(-50%, -50%)",
        transition: "top 0.05s linear"
      }}
    >
      <span className="enemy-emoji">{emoji}</span>
      <div className="enemy-glow"></div>
    </div>
  );
}

export default Enemy;