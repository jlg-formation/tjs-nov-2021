import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { CurrencyContext } from "./contexts/CurrencyContext";
import { LocaleContext } from "./contexts/LocaleContext";
import AppBody from "./layout/AppBody";
import AppFooter from "./layout/AppFooter";
import AppHeader from "./layout/AppHeader";
import { locale } from "./misc/locale";

function App() {
  return (
    <CurrencyContext.Provider value={"EUR"}>
      <LocaleContext.Provider value={locale}>
        <BrowserRouter>
          <AppHeader />
          <AppBody />
          <AppFooter />
        </BrowserRouter>
      </LocaleContext.Provider>
    </CurrencyContext.Provider>
  );
}

export default App;
