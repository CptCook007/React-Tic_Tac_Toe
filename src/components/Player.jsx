import { useState } from "react";
function Player({ playerNameChangeHandler, name, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  function editClickHandler() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      playerNameChangeHandler(symbol, playerName);
    }
  }
  function playerNameChanger(event) {
    setPlayerName(event.target.value);
  }
  let playerNameDiv;
  if (isEditing) {
    playerNameDiv = (
      <input
        className="player-name"
        onChange={playerNameChanger}
        type="text"
        required
        value={playerName}
      ></input>
    );
  } else {
    playerNameDiv = <span className="player-name">{playerName}</span>;
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameDiv}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={editClickHandler}>{!isEditing ? "Edit" : "Save"}</button>
    </li>
  );
}
export default Player;
