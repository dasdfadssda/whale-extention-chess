import React, { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import { languages } from "../Locales/localesData";

function LanguageSelector() {
  const { setLanguageIndex } = useContext(LanguageContext);

  const handleSelect = (e) => {
    const selectedLanguage = e.target.value;
    const index = languages.indexOf(selectedLanguage);
    setLanguageIndex(index);
  };

  return (
    <select onChange={handleSelect}>
      {languages.map((lang, i) => (
        <option key={i} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}

export default LanguageSelector;
