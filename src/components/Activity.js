import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { basicStyle, containerStyle } from "./common";
import ThemeContext from "../contexts/ThemeContext";

function themed(component, style) {
  const NewComponent = styled.div`
    ${style}
  `;
  return props => {
    const { theme } = React.useContext(ThemeContext);
    return <NewComponent {...props} theme={theme} />;
  };
}

const StyledContainer = themed(
  "div",
  `
    ${basicStyle};
    ${containerStyle};
    border-color: lightgrey;
    padding-top: 0px;
  `
);

const Title = styled.h2`
  ${basicStyle};
  border-bottom: solid 1px lightgrey;
  margin-right: 50px;
`;

export default props => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <StyledContainer {...props}>
      <Title theme={theme}>Test</Title>
      Ttest
    </StyledContainer>
  );
};
