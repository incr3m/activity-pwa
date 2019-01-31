import React from "react";
import styled from "@emotion/styled";
import { basicStyle } from "./common";
import ThemeContext from "../contexts/ThemeContext";
import { Map } from "immutable";
import Color from "color";

const StyledButton = styled.button`
  ${basicStyle};
  border: solid 2px gray;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  :hover {
    background-color: ${props => {
      return Color(props.theme.background)
        .negate()
        .alpha(0.2)
        .string();
    }};
  }
  :active {
    background-color: ${props => {
      return Color(props.theme.background)
        .negate()
        .alpha(0.3)
        .string();
    }};
  }
  :not(:last-child) {
      margin-right: 5px;
  }
`;

export default props => {
  const { theme } = React.useContext(ThemeContext);
  return <StyledButton {...props} theme={theme} />;
};