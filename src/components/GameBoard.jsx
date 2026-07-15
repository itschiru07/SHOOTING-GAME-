import Spaceship from "./Spaceship";
import Enemy from "./Enemy";

function GameBoard(){
    return(
        <div className="game-board">
            <Enemy />
            <Spaceship 
            shipPosition = {shipPosition}
            />
            
        </div>
    );
}
export default GameBoard;