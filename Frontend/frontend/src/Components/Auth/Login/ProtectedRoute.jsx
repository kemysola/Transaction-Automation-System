import React, {useEffect, useState} from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  
  const isAuth = localStorage.getItem("isAuthenticated");

  console.log("######isAuth", isAuth)
  

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/user" />
      }
    />
  );
}

export default ProtectedRoute;
