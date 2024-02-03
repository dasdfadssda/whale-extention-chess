import styled from "styled-components";
import React from "react";
import { Link } from 'react-router-dom';
import ROUTES from "../Static/Constants/route";


function HomePage() {

  return (
    <Div>
      <Link to={ROUTES.CHESS}>
        체스 게임으로 이동
      </Link>
    </Div>
  );
}

export default HomePage;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.font};
`;
