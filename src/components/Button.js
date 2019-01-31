import React from "react";
import styled from "@emotion/styled";
import { basicStyle, themed } from "./common";
import Color from "color";

const Btn = themed(styled.button`
  ${basicStyle};
  ${props => (props.color ? `color: ${props.color};` : "")}
  border: ${props => (props.readOnly ? "none" : "solid 2px gray")};
  padding: ${props => (props.small ? "5px 15px" : "10px 25px")};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${props => (props.small ? "12px" : "16px")};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  ${props =>
    props.disabled
      ? `
  color: lightgrey;
  border-color: lightgrey;
  `
      : ""}
  :hover {
    background-color: ${props => {
      if (props.disabled || props.readOnly)
        return Color(props.theme.background).string();
      return Color(props.theme.background)
        .negate()
        .alpha(0.2)
        .string();
    }};
  }
  :active {
    background-color: ${props => {
      if (props.readOnly) return Color(props.theme.background).string();
      return Color(props.theme.background)
        .negate()
        .alpha(0.3)
        .string();
    }};
  }
  :not(:last-child) {
    margin-right: 5px;
  }
`);

export default function(props) {
  return (
    <Btn
      {...props}
      onClick={e => {
        if (props.disabled || props.readOnly) return;
        props.onClick && props.onClick(e);
      }}
    />
  );
}
