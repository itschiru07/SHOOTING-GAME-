import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Gameover from "./components/Gameover";
import GameBoard from "./components/GameBoard";
import Scoreboard from "./components/scoreboard";
import Control from "./components/Control";

function App() {
  // state
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  // 0 = left, 1 = center, 2 = right
  const [shipPosition, setShipPosition] = useState(1);

  const moveLeft = () => {
    if (shipPosition > 0) {
      setShipPosition(shipPosition - 1);
    }
  };

  const moveRight = () => {
    if (shipPosition < 2) {
      setShipPosition(shipPosition + 1);
    }
  };

  return (
    <div className="app">
      <Header />
      <Scoreboard score={score} time={time} />
      <GameBoard shipPosition={shipPosition} />
      <Control moveLeft={moveLeft} moveRight={moveRight} />
      <Gameover />
    </div>
  );
}

export default App;
