function GameOver({ winner, ...props }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>it's a draw</p>}
      <p>
        <button {...props}>Rematch</button>
      </p>
    </div>
  );
}
export default GameOver;
