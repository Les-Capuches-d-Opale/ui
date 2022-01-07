import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import MainLayout from "../router/MainLayout";
import Routes from "../sdk/routes";
import PrivateRoute from "./PrivateRoutes";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.LOGIN} component={Login} />
        <PrivateRoute path={"/"} component={MainLayout} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
