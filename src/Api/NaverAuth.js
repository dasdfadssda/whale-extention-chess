import axios from 'axios';

// 토큰 발급
export const getAccessToken = async (naverCode, savedState) => {
  try {
    const response = await axios.post('https://nid.naver.com/oauth2.0/token', {
      grant_type: 'authorization_code',
      client_id: 'vVUaQENvhs3KoONKOHpY',
      client_secret: 'WCmZS2fqsC',
      code: naverCode,
      state: savedState
    });
    console.log("url 데이터 : ", response);
    return response.data.access_token;
  } catch (error) {
    throw new Error('액세스 토큰을 가져오는 데 실패했습니다.', error);
  }
};

// 유저 정보 읽기
export const getUserInfo = async (accessToken) => {
  try {
    const userInfoResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    console.log("읽은 데이터 :", userInfoResponse.data.response);
    return userInfoResponse.data.response;
  } catch (error) {
    throw new Error('사용자 정보를 가져오는 데 실패했습니다.', error);
  }
};
