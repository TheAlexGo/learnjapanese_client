import {
  Route,
  Redirect
} from "react-router-dom";

const PrivateRoute = ({ loggedIn, ...props }) =>
  loggedIn
    ? <Route { ...props } />
    : <Redirect to="/login" />
export default PrivateRoute;
