import { Routes, Route } from "react-router-dom";
//import Login from "../pages/Login";
//import Register from "../pages/Register";
//import Home from "../pages/Home";
import { PATHS } from "./consts";
//import Topbar from "../components/Topbar";
import ListPage from "../pages/ListPage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={PATHS.ListPage} element={<ListPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;