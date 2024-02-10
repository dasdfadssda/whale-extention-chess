import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getUserInfo } from "../Api/NaverAuth";

function CallbackPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const naverCode = new URLSearchParams(document.location.hash).get("code");
    const naverState = new URLSearchParams(document.location.hash).get("state");

    const savedState = window.localStorage.getItem("naver_state");
    console.log("저장한 naver_state :", savedState);
    console.log("내가 쓸 naver State : ", naverState);
    console.log("현재 URL:", window.location.hash);

    if (naverState !== savedState) {
      alert("로그인 과정에 오류가 발생했습니다.");
      return;
    }

    // 액세스 토큰을 받아오는 로직
    const getAccessTokenAndUserInfo = async () => {
      try {
        const accessToken = await getAccessToken(naverCode, savedState);
        const userInfo = await getUserInfo(accessToken);
        //유저 정보 사용 후 처리 후, navigation 처리
        navigate("/");
        console.log("읽어온 유저 정보 :", userInfo);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (naverState === savedState) {
      getAccessTokenAndUserInfo();
    } else {
      alert("로그인 과정에 오류가 발생했습니다.");
    }
  }, []);

  return <div style={{color:"white"}}>네이버 로그인 인증 중...</div>;
}

export default CallbackPage;
