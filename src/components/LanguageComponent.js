import React, { useContext } from "react";
import { LanguageContext } from "../Context/LanguageContext";
import { contents, titles } from "../Data/Locales/localesData";

function LanguageComponent() {
  const { languageIndex } = useContext(LanguageContext);

  return(
    <>
    <div>{titles[languageIndex]}</div>
    <div>{contents[languageIndex]}</div>
    </>
  );
}

export default LanguageComponent;
