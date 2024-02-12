// UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { UserModel } from '../Model/UserModel'; 
import { fetchUserFromFirebase } from '../Service/Auth/GetUserData';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(UserModel);

  useEffect(() => {
    // 유저 정보 읽어오기
    const fetchUserData = async () => {
      const userId = localStorage.getItem("id");
      if (userId) {
        const userData = await fetchUserFromFirebase(userId);
        if (userData) {
          setUser(userData);
        }
      }
    };
    fetchUserData();
  }, []);

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
