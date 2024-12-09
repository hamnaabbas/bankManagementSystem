
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #041c3c;
    color: #f4f4f4;
  }

  h2 {
    color: #5373fb;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
      border: 1px solid #34343c;
      padding: 10px;
      text-align: left;
    }

    th {
      background-color: #fc2424;
      color: #ffffff;
    }
  }

  button {
    background-color: #5373fb;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }

  button:hover {
    background-color: #34343c;
  }
`;

export default GlobalStyles;
