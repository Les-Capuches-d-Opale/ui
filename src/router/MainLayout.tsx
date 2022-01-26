import { Switch } from "react-router-dom";
import SidebarMenu from "../components/Sidebar/SidebarMenu";
import AdventurerScreen from "../pages/Adventurer";
import Home from "../pages/Home";
import Quest from "../pages/Quest";
import QuestDetails from "../pages/QuestDetails";
import Shop from "../pages/Shop";
import Routes from "../sdk/routes";
import PrivateRoute from "./PrivateRoutes";

const style = {
  display: "grid",
  gridTemplateColumns: "15rem 1fr",
};

const MainLayout = () => {
  return (
    <div style={style}>
      <SidebarMenu />
      <Switch>
        <PrivateRoute exact path={Routes.HOME} component={Home} />
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
