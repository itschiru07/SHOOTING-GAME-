import Spaceship from "./Spaceship";
import Enemy from "./Enemy";

function GameBoard() {
    return (
        <div className="game-board">
            <Spaceship />
            <Enemy />
        </div>
    );
}
export default GameBoard;