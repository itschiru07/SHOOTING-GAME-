function Spaceship() {
  // Example positions (you can adjust these)
  const positions = ["15%", "50%", "68%"];

  // Pick one position (for demo, the first one)
  const shipPosition = positions[0];

  return (
    <div
      className="spaceship"
      style={{ position: "absolute", left: shipPosition, bottom: "20px" }}
    >
      🚀
    </div>
  );
}

export default Spaceship;
