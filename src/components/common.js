import { css } from "@emotion/core";

export const basicStyle = props =>
  css`
    color: ${props.theme.color || "black"};
    background-color: ${props.theme.background || "white"};
    font-family: monospace;
  `;

export const containerStyle = props =>
  css`
    padding: 15px;
    max-width: 600px;
    border: solid 1px dimgray;
    margin: 30px auto;
  `;
