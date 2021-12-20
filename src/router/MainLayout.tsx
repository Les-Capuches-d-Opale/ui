import { Switch } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import Adventurer from "../pages/Adventurer";
import Home from "../pages/Home";
import Item from "../pages/Item";
import Quest from "../pages/Quest";
import Request from "../pages/Request";
import Routes from "../sdk/routes";
import PrivateRoute from "./PrivateRoutes";

const style = {
  display: "grid",
  gridTemplateColumns: "18rem 1fr",
};

const MainLayout = () => {
  return (
    <div style={style}>
      <SidebarMenu />
      <Switch>
        <PrivateRoute path={Routes.HOME} component={Home} />
        <PrivateRoute path={Routes.REQUESTS} component={Request} />
        <PrivateRoute path={Routes.ADVENTURERS} component={Adventurer} />
        <PrivateRoute path={Routes.QUESTS} component={Quest} />
        <PrivateRoute path={Routes.ITEMS} component={Item} />
      </Switch>
    </div>
  );
};
export default MainLayout;
