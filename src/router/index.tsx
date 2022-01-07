import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainLayout from "../router/MainLayout";
import AdventurerXpPopup from "../components/AdventurerXpPopup";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Routes from "../sdk/routes";
import PrivateRoute from "./PrivateRoutes";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.LOGIN} component={Login} />
        <PrivateRoute path={"/"} component={MainLayout} />
        <PrivateRoute path={Routes.ADVENTURER} component={AdventurerXpPopup} />
        <PrivateRoute path={Routes.HOME} component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
