import { BrowserRouter, Route, Switch } from "react-router-dom";
import MainLayout from "../router/MainLayout";
import Login from "../pages/Login";
import Routes from "../sdk/routes";
import PrivateRoute from "./PrivateRoutes";
import QuestDetails from "../pages/QuestDetails";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={Routes.LOGIN} component={Login} />
        <Route path={Routes.QUEST} component={QuestDetails} />
        <PrivateRoute path={"/"} component={MainLayout} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
