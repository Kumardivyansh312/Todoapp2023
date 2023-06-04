import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PortalNavbar from "./portal/navbar/PortalNavbar";
import { Outlet } from "react-router-dom";
import PortalFooter from "./portal/footer/PortalFooter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem("user-token");
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
      {isLoggedIn && <PortalNavbar />}
      <Outlet />
      {isLoggedIn && <PortalFooter />}
    </React.Fragment>
  );
}

export default App;
