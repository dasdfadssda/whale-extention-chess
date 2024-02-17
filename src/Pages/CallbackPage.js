import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getUserInfo } from "../Api/NaverAuth";
import { useUser } from "../Context/UserContext";

// 네이버 로그인 CallBack 페이지
function CallbackPage() {
  // Navigater 선언
  const navigate = useNavigate();
  // ContextAPI - 사용자 정보 변수
  const { setUser } = useUser();
  useEffect(() => {
    const urlHash = window.location.hash;
    const urlParams = new URLSearchParams(
      urlHash.substring(urlHash.indexOf("?"))
    );
    const naverCode = urlParams.get("code");
    const naverState = urlParams.get("state");
    const savedState = window.localStorage.getItem("naver_state");

    // 액세스 토큰을 받아오는 로직
    const getAccessTokenAndUserInfo = async () => {
      try {
        const accessToken = await getAccessToken(naverCode, savedState);
        const userInfo = await getUserInfo(accessToken, setUser);
        // setUser를 호출하여 ContextAPI-user data 업데이트
        setUser(userInfo);
        //유저 정보 사용 후 처리 후, navigation 처리
        navigate("/");
      } catch (error) {
        console.error(error.message);
      }
    };

    if (naverState === savedState) {
      getAccessTokenAndUserInfo();
    } else {
      alert("로그인 과정에 오류가 발생했습니다.");
    }
  }, [setUser, navigate]);

  return <div style={{ color: "white" }}>네이버 로그인 인증 중...</div>;
}

export default CallbackPage;
