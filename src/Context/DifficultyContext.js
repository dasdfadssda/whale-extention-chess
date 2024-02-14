import React from "react";

export const DifficultyContext = React.createContext();

export function DifficultyProvider({ children }) {
  const [difficulty, setDifficulty] = React.useState(
    () => window.sessionStorage.getItem("difficulty") || ""
  );
  
  React.useEffect(() => {
    window.sessionStorage.setItem("difficulty", difficulty);
  }, [difficulty]);
  
  console.log("선택한 난이도: ", difficulty);
  
  return (
    <DifficultyContext.Provider value={{ difficulty, setDifficulty }}>
      {children}
    </DifficultyContext.Provider>
  );
}
