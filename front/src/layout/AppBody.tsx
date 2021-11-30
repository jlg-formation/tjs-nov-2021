import { Route, Routes } from "react-router-dom";
import AppHome from "../routes/AppHome";
import AppLegal from "../routes/AppLegal";
import AppStock from "../routes/AppStock";
import AppStockAdd from "../routes/AppStockAdd";

function AppBody() {
  return (
    <Routes>
      <Route path="/" element={<AppHome />} />
      <Route path="/legal" element={<AppLegal />} />
      <Route path="/stock">
        <Route path="" element={<AppStock />} />
        <Route path="add" element={<AppStockAdd />} />
      </Route>
    </Routes>
  );
}

export default AppBody;
