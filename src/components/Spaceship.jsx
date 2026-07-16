function Spaceship({ shipPosition = 1 }) {
  const positions = ["15%", "50%", "85%"];
  const currentLeft = positions[shipPosition];

  return (
    <div
      className="spaceship-container"
      style={{
        position: "absolute",
        left: currentLeft,
        bottom: "20px",
        transform: "translateX(-50%)",
        transition: "left 0.18s cubic-bezier(0.25, 0.8, 0.25, 1)",
      }}
    >
      <div className="spaceship-sprite">
        🚀
        <div className="spaceship-thruster"></div>
      </div>
    </div>
  );
}

export default Spaceship;
