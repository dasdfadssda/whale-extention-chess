// NaverLoginButton.js
import React from "react";
import styled from "styled-components";
import { handleNaverLogin } from "../Service/Auth/NaverLogin";

function NaverLoginButton() {

  return (
    <NaverButton onClick={handleNaverLogin}>
      <img
        src={require("../Static/Assets/NaverLoginButton.png")}
        alt="네이버 로그인 버튼"
      />
    </NaverButton>
  );
}

export default NaverLoginButton;

const NaverButton = styled.button`
  width: 36vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  margin-top: 4vw;
  img {
    max-width: 85%;
    max-height: 85%;
  }
  cursor: pointer;
`;
