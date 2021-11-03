import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 
  }

  html, body {
    font-size: 16px;
    font-family: 'normal';
    letter-spacing: 10;
  }

  .h1, .h2, .h3, .h4, .h5, .h6, 
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }
`;

export default GlobalStyles;
