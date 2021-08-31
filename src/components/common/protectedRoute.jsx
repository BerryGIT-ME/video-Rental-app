import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../../services/authService";

function ProtectedRoute({ path, component: Component, render }) {
  const user = auth.decode();
  let validUser;
  if (user) validUser = user.isAdmin;

  return (
    <Route
      path={path}
      render={(reactProps) => {
        if (!validUser)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: reactProps.location },
              }}
            />
          );
        return Component ? <Component {...reactProps} /> : render(reactProps);
      }}
    />
  );
}

export default ProtectedRoute;
