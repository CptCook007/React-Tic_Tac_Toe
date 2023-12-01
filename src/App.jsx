import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/GameLog";
import GameOver from "./components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
const PLAYERS = { X: "Player 1", O: "Player 2" };
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(prevTurns) {
  let currentPlayer = "X";
  if (prevTurns.length > 0 && prevTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);
  const currentPlayer = deriveActivePlayer(gameTurns);
  const gameBoard = [...initialBoard.map((innerArray) => [...innerArray])];
  let winner = null;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    console.log(square);
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSybol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSybol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      console.log(firstSquareSymbol);
      winner = playerName[firstSquareSymbol];
    }
  }
  let isDraw = false;
  if (gameTurns.length === 9 && !winner) {
    isDraw = true;
  }
  function playerNameChangeHandler(symbol, newPlayerName) {
    playerName[symbol] = newPlayerName;
    setPlayerName(playerName);
  }
  function rematchHandler() {
    setGameTurns([]);
  }
  function selectPlayerHandler(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurn;
    });
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              name={playerName.X}
              symbol="X"
              isActive={currentPlayer === "X"}
              playerNameChangeHandler={playerNameChangeHandler}
            ></Player>
            <Player
              name={playerName.O}
              playerNameChangeHandler={playerNameChangeHandler}
              symbol="O"
              isActive={currentPlayer === "O"}
            ></Player>
          </ol>
          <GameBoard
            playerHandler={selectPlayerHandler}
            board={gameBoard}
          ></GameBoard>
          {(winner || isDraw) && (
            <GameOver winner={winner} onClick={rematchHandler}></GameOver>
          )}
        </div>
        <ol id="log">
          <Log playerLog={gameTurns}></Log>
        </ol>
      </main>
    </>
  );
}

export default App;
