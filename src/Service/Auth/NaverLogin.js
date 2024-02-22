// 네이버 로그인
export function handleNaverLogin() {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_KEY;
  const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_CALLBACK_URL+'/#/callback';

  const generateState = () => {
    return [...Array(10)].map(() => Math.random().toString(36)[2]).join("");
  };

  const state = generateState();
  const NAVER_LOGIN_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    NAVER_CALLBACK_URL
  )}&state=${state}`;
  window.localStorage.setItem("naver_state", state);
  window.location.href = NAVER_LOGIN_URL;
}
