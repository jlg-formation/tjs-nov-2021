import AppToggle from "../widgets/AppToggle";

function AppHeader() {
  return (
    <header>
      <a href="/">
        <span className="icon-logo"></span>
        <span>Gestion Stock</span>
      </a>
      <AppToggle label={{ on: "icon-sun", off: "icon-moon" }} checked={true} />
    </header>
  );
}

export default AppHeader;
