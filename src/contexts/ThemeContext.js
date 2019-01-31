import React from "react";
import Color from "color";

//Theme definitions here
const themes = {
  light: {
    color: "black",
    background: "white"
  },
  dark: {
    color: "lightgrey",
    background: "black"
  }
};

const ThemeContext = React.createContext();

export function Provider(props) {
  const [theme, setTheme] = React.useState(themes.light);
  const value = {
    theme,
    setTheme,
    themes
  };
  const [bodyBg, setBodyBg] = React.useState("blue");
  React.useEffect(
    () => {
      //get denser color
      const newBodyBg = Color(theme.background)
        .alpha(0.9)
        .string();
      setBodyBg(newBodyBg);
    },
    [theme]
  );
  document.body.style.backgroundColor = bodyBg;
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
