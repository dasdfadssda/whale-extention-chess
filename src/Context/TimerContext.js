import React from "react";

export const TimerContext = React.createContext();

export function TimerProvider({ children }) {
  const [timeState, setTimeState] = React.useState(0);
  console.log(timeState);

  return (
    <TimerContext.Provider value={{ timeState, setTimeState }}>
      {children}
    </TimerContext.Provider>
  );
}
