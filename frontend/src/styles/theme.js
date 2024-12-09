export const theme = {
    colors: {
      primary: "#34343c",
      accent: {
        red: "#fc2424",
        blue: "#5373fb",
        navy: "#041c3c",
        green: "#bcf404",
      },
    },
    fonts: {
      primary: "Arial, sans-serif",
    },
  };
  
  import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.accent.blue};
  }
`;
export default GlobalStyle;
