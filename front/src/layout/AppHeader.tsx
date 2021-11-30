import AppThemeToggle from "../widgets/AppThemeToggle";

function AppHeader() {
  return (
    <header>
      <a href="/">
        <span className="icon-logo"></span>
        <span>Gestion Stock</span>
      </a>
      <AppThemeToggle />
    </header>
  );
}

export default AppHeader;
