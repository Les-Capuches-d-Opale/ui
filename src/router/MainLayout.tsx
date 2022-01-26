import { Switch } from "react-router-dom";
import SidebarMenu from "../components/Sidebar/SidebarMenu";
import AdventurerScreen from "../pages/Adventurer";
import Request from "../pages/Request";
import Quest from "../pages/Quest";
import QuestDetails from "../pages/QuestDetails";
import Shop from "../pages/Shop";
import Routes from "../sdk/routes";
import PrivateRoute from "./PrivateRoutes";
import Dashboard from "../pages/Dashboard";

const style = {
  display: "grid",
  gridTemplateColumns: "15rem 1fr",
};

const MainLayout = () => {
  return (
    <div style={style}>
      <SidebarMenu />
      <Switch>
        <PrivateRoute exact path={Routes.HOME} component={Dashboard} />
        <PrivateRoute exact path={Routes.REQUESTS} component={Request} />
        <PrivateRoute
          exact
          path={Routes.ADVENTURERS}
          component={AdventurerScreen}
        />
        <PrivateRoute exact path={Routes.QUESTS} component={Quest} />
        <PrivateRoute exact path={Routes.QUEST} component={QuestDetails} />
        {/* <PrivateRoute path={Routes.ITEMS} component={Item} /> */}
        <PrivateRoute exact path={Routes.SHOPS} component={Shop} />
      </Switch>
    </div>
  );
};
export default MainLayout;
