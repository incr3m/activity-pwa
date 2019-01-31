import React from "react";
import { Provider as ThemeContextProvider } from "./contexts/ThemeContext";
import ActivityContext, {
  Provider as ActContextProvider
} from "./contexts/ActivityContext";

import ThemedButton from "./components/Button";
import MainContainer from "./components/MainContainer";
import Activity from "./components/Activity";
import ThemeSwitcher from "./components/ThemeSwitcher";
import styled from "@emotion/styled";
import { GITHUB_LINK } from "./config";

const FloatRight = styled.div`
  float: right;
`;

const Divider = styled.div`
  clear: both;
`;

const Stats = styled.div`
  clear: both;
  padding-top: 10px;
`;

const ActivityList = props => {
  const { list, setActiveIndex, activeIndex } = React.useContext(
    ActivityContext
  );
  return list.map(act => (
    <Activity
      key={act.id}
      id={act.id}
      value={act}
      active={activeIndex === act.id}
      onClick={() => setActiveIndex(act.id)}
    />
  ));
};

const HeaderControls = props => {
  const { newActivity, reset, list } = React.useContext(ActivityContext);
  return (
    <>
      <FloatRight>
        <ThemedButton onClick={() => newActivity()}>New Activity</ThemedButton>
        <ThemedButton onClick={() => reset()}>Reset</ThemedButton>
      </FloatRight>
      <Stats>
        <div>Activities: {list.length}</div>
        <div>
          Completed: {list.filter(act => act.status === "Completed").length}
        </div>
      </Stats>
    </>
  );
};

const Github = styled.div`
  top: -50px;
  position: relative;
  height: 0;
  right: -20px;
`;

export default props => {
  return (
    <ThemeContextProvider>
      <ActContextProvider>
        <MainContainer>
          <div>
            <FloatRight>
              <Github>
                <a href={GITHUB_LINK}>Github</a>
              </Github>
              <ThemeSwitcher />
            </FloatRight>
            <h1>My Activities</h1>
          </div>
          <HeaderControls />
          <Divider />
        </MainContainer>
        <ActivityList />
      </ActContextProvider>
    </ThemeContextProvider>
  );
};
