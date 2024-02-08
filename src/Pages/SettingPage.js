import React, { useState } from "react";

const ChessSettings = () => {
  const [difficulty, setDifficulty] = useState("");

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div>
      <h1 style={{ color: "white" }}>체스 설정</h1>
    </div>
  );
};

export default ChessSettings;
