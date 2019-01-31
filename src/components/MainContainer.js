import React from "react";
import styled from "@emotion/styled";
import { basicStyle, containerStyle } from "./common";
import ThemeContext from "../contexts/ThemeContext";

const StyledContainer = styled.div`
  ${basicStyle};
  ${containerStyle};
`;

export default props => {
  const { theme } = React.useContext(ThemeContext);
  return <StyledContainer {...props} theme={theme} />;
};
