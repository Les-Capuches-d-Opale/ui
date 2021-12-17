import { Redirect, Route } from "react-router-dom";
import Routes from "../sdk/routes";
// import { useAuth } from "src/context";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
//   const { user } = useAuth();
let user: undefined;

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={Routes.LOGIN} />
      }
    />
  );
};

export default PrivateRoute;
