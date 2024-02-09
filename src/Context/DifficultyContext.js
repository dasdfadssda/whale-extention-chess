import React from "react";

export const DifficultyContext = React.createContext();

export function DifficultyProvider({ children }) {
  const [difficulty, setDifficulty] = React.useState("");

  return (
    <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
      {children}
    </DifficultyContext.Provider>
  );
}
