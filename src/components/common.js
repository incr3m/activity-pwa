import React from 'react';
import { css } from "@emotion/core";
import ThemeContext from "../contexts/ThemeContext";

export function themed(Component) {
  return props => {
    const { theme } = React.useContext(ThemeContext);
    return <Component {...props} theme={theme} />;
  };
}

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
    border: solid 2px dimgray;
    margin: 30px auto;
  `;
