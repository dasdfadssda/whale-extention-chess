// UserContext.js
import React, { createContext, useContext } from "react";
import { UserModel } from "../Model/UserModel";
import { fetchUserFromFirebase } from "../Service/Auth/GetUserData";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // 전역 변수 API 선언
  const [user, setUser] = React.useState(
    () => window.sessionStorage.getItem("userData") || UserModel
  );

  React.useEffect(() => {
    window.sessionStorage.setItem("userData", user);
  }, [user]);

  // 로컬 스토리지에 마지막으로 사용자 데이터가 업데이트된 시간을 저장
  const [lastUpdatedTime, setLastUpdatedTime] = React.useState(
    () => window.localStorage.getItem("lastUpdatedTime") || 0
  );

  // 사용자 데이터가 업데이트된 시간을 로컬 스토리지에 저장
  React.useEffect(() => {
    window.sessionStorage.setItem("userData", JSON.stringify(user));
    setLastUpdatedTime(Date.now()); // 현재 시간을 밀리초로 저장
  }, [user]);

  // 유저 관리
  React.useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("id");

      // 최근 30초 이내에 업데이트된 경우에만 사용자 데이터를 가져옴
      if (Date.now() - lastUpdatedTime <= 30000) {
        const userData = await fetchUserFromFirebase(userId);
        if (userData) {
          setUser(userData);
        }
      }
    };
    fetchUserData();
  }, [lastUpdatedTime]);

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
