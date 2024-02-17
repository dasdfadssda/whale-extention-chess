import React, { createContext, useContext, useEffect } from "react";
import { UserModel } from "../Model/UserModel";
import { fetchUserFromFirebase } from "../Service/Auth/GetUserData";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 전역 변수 API 선언
  const [user, setUser] = React.useState(
    () => JSON.parse(window.sessionStorage.getItem("userData")) || UserModel
  );
  // 유저 관리
  useEffect(() => {
    const lastFetchTime = localStorage.getItem("lastFetchTime");
    const currentTime = Date.now();

    // 만약 마지막으로 데이터를 읽은 시간이 없거나 현재 시간과의 차이가 30초 이상인 경우에만 데이터를 읽어옴
    if (!lastFetchTime || currentTime - parseInt(lastFetchTime) >= 3) {
      const fetchUserData = async () => {
        const userId = localStorage.getItem("id");

        if (userId) {
          const userData = await fetchUserFromFirebase(userId);
          if (userData) {
            setUser(userData);

            // 데이터를 읽은 시간을 현재 시간으로 업데이트
            localStorage.setItem("lastFetchTime", currentTime.toString());
          }
        }
      };
      fetchUserData();
    } else {
      console.error("아직 못 읽어옴 ㅋ");
    }
  }, []);

  // 유저 정보 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    window.sessionStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  console.log("user 정보 :", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
