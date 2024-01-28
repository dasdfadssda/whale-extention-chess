import React from "react";

export const LanguageContext = React.createContext();

export function LanguageProvider({ children }) {
  const [languageIndex, setLanguageIndex] = React.useState(0); // Default: Korean

  return (
    <LanguageContext.Provider value={{ languageIndex, setLanguageIndex }}>
      {children}
    </LanguageContext.Provider>
  );
}
