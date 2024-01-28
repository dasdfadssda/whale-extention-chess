import React, { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import { titles } from "../Locales/localesData";

function LanguageComponent() {
  const { languageIndex } = useContext(LanguageContext);

  return <div>{titles[languageIndex]}</div>;
}

export default LanguageComponent;
