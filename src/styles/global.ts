import {css} from "@emotion/react";

const globalStyle = css`

  html {
    height: 100%;
    display: flex;
    justify-content: center;
  }

  body {
    max-width: 520px;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -ms-overflow-style: none;
  }

  a {
    text-decoration: none;
  }
`;

export default globalStyle;
