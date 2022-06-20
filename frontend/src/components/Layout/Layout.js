import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import AdminNavigation from "./AdminNavigation";
import "./Layout.css";

const Layout = (props) => {
  return (
    <Fragment>
      <div className="layout">
        <MainNavigation />
        <div className="child">{props.children}</div>
      </div>
      {/* <div className="layout-admin">
        <MainNavigation />
        <AdminNavigation />
        <div className="child-admin">{props.children}</div>
      </div> */}
    </Fragment>
  );
};

export default Layout;
