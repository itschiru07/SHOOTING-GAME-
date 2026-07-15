function Controls({ moveLeft, shoot, moveRight, onStart }){
    return(
        <div className="controls">
            <button onClick={onStart}>Start</button>
            <button onClick={moveLeft}>Left</button>
            <button onClick={shoot}>Shoot</button>
            <button onClick={moveRight}>Right</button>
        </div>
    );
}
export default Controls;