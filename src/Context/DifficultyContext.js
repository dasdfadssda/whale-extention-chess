import React from "react";

export const DifficultyContext = React.createContext();

export function DifficultyProvider({ children }) {
  const [difficulty, setDifficulty] = React.useState("");
  console.log(difficulty);

  return (
    <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
      {children}
    </DifficultyContext.Provider>
  );
}
