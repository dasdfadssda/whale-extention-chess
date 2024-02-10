// NaverLoginButton.js
import React from "react";

// 상태 토큰 생성 함수
function generateState() {
  return [...Array(10)].map(() => Math.random().toString(36)[2]).join("");
}

function NaverLoginButton() {
  const NAVER_CLIENT_ID = "vVUaQENvhs3KoONKOHpY";
  const NAVER_CALLBACK_URL = "http://localhost:3000/#/callback";

  const handleNaverLogin = () => {
    const state = generateState();
    const NAVER_LOGIN_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      NAVER_CALLBACK_URL
    )}&state=${state}`;
    window.localStorage.setItem("naver_state", state);
    window.location.href = NAVER_LOGIN_URL;
  };

  return <button onClick={handleNaverLogin}>네이버로 로그인하기</button>;
}

export default NaverLoginButton;
