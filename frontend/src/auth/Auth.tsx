import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthFooter from "./footer/AuthFooter";
import AuthNavbar from "./navbar/AuthNavbar";

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem("user-token");
    console.log(userToken, "USER TOKEN");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      <AuthNavbar />
      <Outlet />
      <AuthFooter />
    </React.Fragment>
  );
};

export default Auth;
