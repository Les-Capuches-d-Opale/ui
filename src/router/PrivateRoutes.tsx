import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import Routes from "../sdk/routes";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { authUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? <Component {...props} /> : <Redirect to={Routes.LOGIN} />
      }
    />
  );
};

export default PrivateRoute;
