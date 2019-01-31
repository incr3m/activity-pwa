import React from "react";
import styled from "@emotion/styled";
import { basicStyle, themed } from "./common";
import { Map } from "immutable";
import Color from "color";

const Btn = themed(styled.button`
  ${basicStyle};
  ${props => (props.color ? `color: ${props.color};` : "")}
  border: solid 2px gray;
  padding: ${props => (props.small ? "5px 15px" : "10px 25px")};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${props => (props.small ? "12px" : "16px")};
  cursor: pointer;
  ${props =>
    props.disabled
      ? `
  color: lightgrey;
  border-color: lightgrey;
  `
      : ""}
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
`);

export default function(props) {
  return (
    <Btn
      {...props}
      onClick={() => {
        if (props.disabled) return;
        props.onClick && props.onClick();
      }}
    />
  );
}
