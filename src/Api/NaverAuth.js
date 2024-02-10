import axios from 'axios';

// 토큰 발급
export const getAccessToken = async (naverCode, savedState) => {
  try {
    const response = await axios.post('http://localhost:8000/token/', {
      code: naverCode,
      state: savedState
    });
    return response.data.access_token;
  } catch (error) {
    throw new Error('액세스 토큰을 가져오는 데 실패했습니다.', error);
  }
};

// 유저 정보 읽기
export const getUserInfo = async (accessToken) => {
  try {
    const response = await axios.get('http://localhost:8000/userinfo/', {
      params: {
        access_token: accessToken
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('사용자 정보를 가져오는 데 실패했습니다.', error);
  }
};


