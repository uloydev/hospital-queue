import React from "react";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <MainNavigation />
      <div className={classes.child}>{props.children}</div>
    </div>
  );
};

export default Layout;
