import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CallbackPage() {
const navigate = useNavigate();
  useEffect(() => {
    const naverCode = new URLSearchParams(document.location.hash).get('code');
    const naverState = new URLSearchParams(document.location.hash).get('state');

    const savedState = window.localStorage.getItem('naver_state');
    console.log("저장한 naver_state :", savedState);
    console.log("내가 쓸 naver State : ", naverState);
    console.log("현재 URL:", window.location.hash);


    if (naverState !== savedState) {
      alert('로그인 과정에 오류가 발생했습니다.');
      return;
    }
    
    // 액세스 토큰을 받아오는 로직
    const getAccessToken = async () => {
      try {
        const response = await axios.post('https://nid.naver.com/oauth2.0/token', {
          grant_type: 'authorization_code',
          client_id: 'vVUaQENvhs3KoONKOHpY',
          client_secret: 'WCmZS2fqsC',
          code: naverCode,
          state: savedState
        });
        console.log("url 데이터 : ",response);
        const accessToken = response.data.access_token;
        // 사용자 정보 요청
        const userInfoResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        console.log("읽은 데이터 :",userInfoResponse.data.response);
        navigate("/");
      } catch (error) {
        console.error('액세스 토큰이나 사용자 정보를 가져오는데 실패했습니다. ', error);
      }
    };

    getAccessToken();
  }, []);

  return (
    <div>
      네이버 로그인 인증 중...
    </div>
  );
}

export default CallbackPage;
