import React from "react";
import { Provider as ThemeContextProvider } from "./contexts/ThemeContext";
import { Provider as ActContextProvider } from "./contexts/ActivityContext";

import ThemedButton from "./components/Button";
import MainContainer from "./components/MainContainer";
import Activity from "./components/Activity";
import ThemeSwitcher from "./components/ThemeSwitcher";
import styled from "@emotion/styled";

const FloatRight = styled.div`
  float: right;
`;

const Divider = styled.div`
  clear: both;
`;

export default props => {
  return (
    <ThemeContextProvider>
      <ActContextProvider>
        <MainContainer>
          <div>
            <FloatRight>
              <ThemeSwitcher />
            </FloatRight>
            <h1>My Activities</h1>
          </div>
          some things
          <FloatRight>
            <ThemedButton onClick={() => alert("hi")}>
              New Activity
            </ThemedButton>
            <ThemedButton>Clear All</ThemedButton>
          </FloatRight>
          <Divider />
        </MainContainer>
        <Activity />
      </ActContextProvider>
    </ThemeContextProvider>
  );
};
