function Laser({ lane = 1, y = 80 }) {
  const positions = ["15%", "50%", "85%"];
  const leftPos = positions[lane];

  return (
    <div
      className="laser-projectile"
      style={{
        position: "absolute",
        left: leftPos,
        top: `${y}%`,
        transform: "translate(-50%, -50%)"
      }}
    >
      <div className="laser-beam"></div>
    </div>
  );
}

export default Laser;