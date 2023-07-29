import React from "react";
import authService from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, children, ...rest }) => {
  return (
    <Route {...rest} path={path}>
      {authService.getCurrentUser() ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
