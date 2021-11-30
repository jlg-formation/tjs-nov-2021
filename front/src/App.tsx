import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AppBody from "./layout/AppBody";
import AppFooter from "./layout/AppFooter";
import AppHeader from "./layout/AppHeader";

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <AppBody />
      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
