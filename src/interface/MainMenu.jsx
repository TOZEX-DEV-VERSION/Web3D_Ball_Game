

import { useState } from "react";
import useGame from "../stores/useGame.js";
import LogoBall from "../assets/logo_ball_stroke.svg";
import Wordmark from "../assets/wordmark.svg";
import { getLocalStorage, setLocalStorage } from "../stores/utils.js";

export default function MainMenu() {
  const {
    mode,
    setMode,
    blocksCount,
    setBlocksCount,
    level,
    setLevel,
    difficulty,
    setDifficulty,
    setIsInGame,
  } = useGame();

  const [isSettings, setIsSettings] = useState(false);

  document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      setIsInGame(true);
    }
  });

  return (
    <div className="main-menu">
      <img className="logo-ball" src={LogoBall} />
      <img className="wordmark" src={Wordmark} />
      <div className="main-menu-button" onClick={() => setIsInGame(true)}>
        Play
      </div>

      
    </div>
  );
}
