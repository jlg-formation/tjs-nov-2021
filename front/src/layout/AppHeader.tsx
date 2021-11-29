import { useEffect, useState } from "react";
import { themeService } from "../services/ThemeService";
import AppToggle from "../widgets/AppToggle";

function AppHeader() {
  const [theme, setTheme] = useState(themeService.theme$.value);
  useEffect(() => {
    themeService.theme$.subscribe((t) => {
      setTheme(t);
    });
  });
  return (
    <header>
      <a href="/">
        <span className="icon-logo"></span>
        <span>Gestion Stock</span>
      </a>
      <AppToggle
        label={{ on: "icon-sun", off: "icon-moon" }}
        checked={theme === "light"}
        action={themeService.toggle.bind(themeService)}
      />
    </header>
  );
}

export default AppHeader;
