import React from "react";
import styled from "@emotion/styled";
import { basicStyle, containerStyle, themed } from "./common";
import ThemeContext from "../contexts/ThemeContext";

export default themed(styled.div`
  ${basicStyle};
  ${containerStyle};
`);
