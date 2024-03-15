import {
  choList,
  jongList,
  jungList,
  romanConsonantMap,
  romanVowelMap,
} from "../../Model/RomanizedModel";

// 한글을 로마자로 변환하는 함수
export const convertToRomanized = (text) => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);
    if (code >= 44032 && code <= 55203) {
      // 한글 유니코드 범위
      const choIndex = Math.floor((code - 44032) / 588);
      const jungIndex = Math.floor((code - 44032 - choIndex * 588) / 28);
      const jongIndex = (code - 44032) % 28;
      const cho = choList[choIndex];
      const jung = jungList[jungIndex];
      const jong = jongList[jongIndex];
      // 종성이 없는 경우 무시하고 자음과 모음만을 로마자로 변환
      const romanizedChar =
        romanConsonantMap[cho] +
        romanVowelMap[jung] +
        (jong !== "" ? romanConsonantMap[jong] : "");
      result += romanizedChar;
    } else {
      result += char;
    }
  }

  return result;
};
