import { Link } from "react-router-dom";
import AppThemeToggle from "../widgets/AppThemeToggle";

function AppHeader() {
  return (
    <header>
      <Link to="/">
        <span className="icon-logo"></span>
        <span>Gestion Stock</span>
      </Link>
      <AppThemeToggle />
    </header>
  );
}

export default AppHeader;
