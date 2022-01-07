import { Redirect, Route, Switch } from "react-router-dom";
import SidebarMenu from "../components/SidebarMenu";
import Adventurer from "../pages/Adventurer";
import Home from "../pages/Home";
import Item from "../pages/Item";
import Quest from "../pages/Quest";
import QuestDetails from "../pages/QuestDetails";
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
        <Route exact path="/">
          <Redirect to={Routes.HOME} />
        </Route>
        <PrivateRoute path={Routes.HOME} component={Home} />
        <PrivateRoute path={Routes.ADVENTURERS} component={Adventurer} />
        <PrivateRoute exact path={Routes.QUESTS} component={Quest} />
        <PrivateRoute exact path={Routes.QUEST} component={QuestDetails} />
        <PrivateRoute path={Routes.ITEMS} component={Item} />
      </Switch>
    </div>
  );
};
export default MainLayout;
