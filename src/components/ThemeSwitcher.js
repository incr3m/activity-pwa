import React from "react";
import ThemeContext from "../contexts/ThemeContext";
import Switch from "react-switch";

export default function ThemeSwitcher() {
  const [nightModeEnabled, setNightMode] = React.useState(false);
  const { setTheme, themes } = React.useContext(ThemeContext);
  React.useEffect(
    () => {
      setTheme(nightModeEnabled ? themes.dark : themes.light);
    },
    [nightModeEnabled]
  );
  return (
    <Switch
      onChange={setNightMode}
      checked={nightModeEnabled}
      uncheckedIcon={
        <img
          height="15"
          width="15"
          alt="night"
          style={{ margin: 6 }}
          src="https://svgshare.com/i/Au6.svg"
          title="night"
        />
      }
      checkedIcon={
        <img
          height="20"
          width="20"
          alt="day"
          style={{ margin: 4 }}
          src="https://svgshare.com/i/Atp.svg"
          title="day"
        />
      }
      className="react-switch"
      id="icon-switch"
    />
  );
}
