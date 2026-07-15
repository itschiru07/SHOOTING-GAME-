function Spaceship({ shipPosition = 1 }) {
  // Example positions (you can adjust these)
  const positions = ["15%", "50%", "68%"];

  // Pick the position based on the shipPosition prop
  const currentLeft = positions[shipPosition];

  return (
    <div
      className="spaceship"
      style={{ position: "absolute", left: currentLeft, bottom: "20px" }}
    >
      🚀
    </div>
  );
}

export default Spaceship;
