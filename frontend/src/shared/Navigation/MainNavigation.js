import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";
import HamburgerIcon from "../../images/hamburger-icon.png";

const MainNavigation = (props) => {
  const auth = useContext(AuthContext);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      <SideDrawer
        show={drawerIsOpen && auth.isLoggedIn}
        onClick={closeDrawerHandler}
      >
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        {auth.isLoggedIn && (
          <div id="drawer-button" onClick={openDrawerHandler}>
            <img src={HamburgerIcon} alt="menu-icon" />
          </div>
        )}

        <Link className="logo" to={auth.isLoggedIn ? "/home" : "/"}>
          wedamood
        </Link>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
