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
  const [key, setTheme] = React.useState(
    localStorage.getItem("theme") || "light"
  );
  const currentTheme = themes[key];
  const value = {
    key,
    theme: currentTheme,
    setTheme,
    themes
  };
  const [bodyBg, setBodyBg] = React.useState("blue");
  React.useEffect(
    () => {
      //get denser color
      const newBodyBg = Color(currentTheme.background)
        .alpha(0.9)
        .string();
      setBodyBg(newBodyBg);
      localStorage.setItem("theme", key);
    },
    [key]
  );
  document.body.style.backgroundColor = bodyBg;
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
