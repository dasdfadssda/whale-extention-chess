// UserContext.js
import React, { createContext, useContext, useEffect } from "react";
import { UserModel } from '../Model/UserModel'; 
import { fetchUserFromFirebase } from '../Service/Auth/GetUserData';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(UserModel);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("id");

    
     const userData = await fetchUserFromFirebase(userId);
      if (userData) {
        setUser(userData);
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
