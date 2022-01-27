import { useMediaQuery } from "react-responsive";
import { Switch } from "react-router-dom";
import Navigation from "../components/Navigation";
import AdventurerScreen from "../pages/Adventurer";
import Dashboard from "../pages/Dashboard";
import Quest from "../pages/Quest";
import QuestDetails from "../pages/QuestDetails";
import Request from "../pages/Request";
import Shop from "../pages/Shop";
import Routes from "../sdk/routes";
import { layout } from "../utils/breakpoints";
import PrivateRoute from "./PrivateRoutes";

const style = {
  display: "grid",
  gridTemplateColumns: "15rem 1fr",
};

const MainLayout = () => {
  const isBreakpoint = useMediaQuery({ maxWidth: layout.breakpoints.l });
  return (
    <div style={!isBreakpoint ? style : {}}>
      <Navigation />
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
