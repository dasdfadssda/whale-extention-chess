import axios from "axios";
import { UserModel } from "../Model/UserModel";
import { saveUserToFirebase } from "../Service/Auth/SetUserData";

// 유저 토큰 발급
export const getAccessToken = async (naverCode, savedState) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/naver/token/`,
      {
        params: {
          code: naverCode,
          state: savedState,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("액세스 토큰을 가져오는 데 실패했습니다.", error);
    alert("액세스 토큰을 가져오는 데 실패했습니다.");
  }
};

// 유저 정보 읽기
export const getUserInfo = async (accessToken, setUser) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/naver/userinfo/`,
      {
        params: {
          access_token: accessToken,
        },
      }
    );
    const userInfo = response.data.user_info;

    // UserModel에 사용자 정보를 채워넣기
    const userToSave = {
      ...UserModel,
      name: userInfo.name,
      email: userInfo.email,
      age: userInfo.age,
      gender: userInfo.gender,
      id: userInfo.id,
    };

    // saveUserToFirebase 함수 호출
    saveUserToFirebase(userToSave, userInfo.id, setUser);
    alert("로그인이 완료 되었습니다.");
    return userToSave;
  } catch (error) {
    console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
    alert("사용자 정보를 가져오는 데 실패했습니다.");
  }
};
