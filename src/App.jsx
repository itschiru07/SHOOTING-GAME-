import "./App.css";
import Header from "./components/Header";
import Gameover from "./components/Gameover";
import GameBoard from "./components/GameBoard";
import Scoreboard from "./components/scoreboard";
import Control from "./components/Control";


function app(){
  return(
    <div className="app">
      <Header/>
      <Scoreboard/>
      <GameBoard/>
      
      <Control/>
     
    </div>
  );
}
export default app