import React,{useEffect, useState} from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  //const isAuthenticated = localStorage.getItem("isAuthenticated")
  const [isAuthenticated, setIsAuthenticated] =useState(true)

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated"))
  },[isAuthenticated])




  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/user" />
      }
    />
  );
}

export default ProtectedRoute;
