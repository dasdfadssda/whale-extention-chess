import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.backgroundColor}; // 배경색을 설정합니다.
  }
`;

export default GlobalStyle;