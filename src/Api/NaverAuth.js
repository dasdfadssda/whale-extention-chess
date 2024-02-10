import axios from 'axios';

export const getAccessToken = async (naverCode, savedState) => {
  console.log('읽어온 naverCode',naverCode, savedState);
  try {
    const response = await axios.get('http://localhost:8000/naver/token/', {
      params: {
        code: naverCode,
        state: savedState,
      },
    });
    console.log('읽어온 데이터',response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('액세스 토큰을 가져오는 데 실패했습니다.', error);
  }
};

export const getUserInfo = async (accessToken) => {
  try {
    const response = await axios.get('http://localhost:8000/naver/userinfo/', {
      params: {
        access_token: accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
  }
};
