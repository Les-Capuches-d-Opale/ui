import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import Routes from "../sdk/routes";

const PrivateRoute = (props: RouteProps) => {
  const { authUser } = useAuth();

  return authUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: Routes.LOGIN,
        state: { referer: props.location?.pathname },
      }}
    />
  );
};

export default PrivateRoute;
