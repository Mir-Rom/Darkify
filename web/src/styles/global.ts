import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    background-color: ${({ theme }) => theme.colors.bg.main};
    color: ${({ theme }) => theme.colors.fg.primary};
    font-family: 'Satoshi', sans-serif;
    padding: 7px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export default GlobalStyle;