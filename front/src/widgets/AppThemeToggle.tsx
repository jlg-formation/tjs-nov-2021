import { useEffect, useState } from "react";
import { themeService } from "../services/ThemeService";
import AppToggle from "./AppToggle";

function AppThemeToggle() {
  const [theme, setTheme] = useState(themeService.theme$.value);

  useEffect(() => {
    console.log("header effect");
    themeService.theme$.subscribe((t) => {
      setTheme(t);
    });
  }, []);
  return (
    <AppToggle
      label={{ on: "icon-sun", off: "icon-moon" }}
      checked={theme === "light"}
      action={themeService.toggle.bind(themeService)}
    />
  );
}

export default AppThemeToggle;
