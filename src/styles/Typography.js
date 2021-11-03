import { createGlobalStyle } from "styled-components";

import normal from "../assets/font/Poppins-Regular.ttf";
import medium from "../assets/font/Poppins-Medium.ttf";
import bold from "../assets/font/Poppins-Bold.ttf";

export const Typography = createGlobalStyle`
  @font-face {
    font-family: 'normal';
    src: url(${normal}) 
    format("truetype");
    font-style: normal;
 
  }
  @font-face {
    font-family: 'medium';
    src: url(${medium}) 
    format("truetype");

  }
  @font-face {
    font-family: 'bold';
    src: url(${bold}) 
    format("truetype");
  }
 `;
