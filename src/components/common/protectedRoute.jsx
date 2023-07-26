import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "../../services/authService";

const ProtectedRoute = ({ path, children, ...rest }) => {
  return (
    <Route {...rest} path={path}>
      {authService.getCurrentUser() ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
