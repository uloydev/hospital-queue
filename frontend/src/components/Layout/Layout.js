import { Fragment, useContext } from "react";
import MainNavigation from "./MainNavigation";
import AdminNavigation from "./AdminNavigation";
import "./Layout.css";
import AuthContext from "../../store/auth-context";

const Layout = (props) => {
  const authCtx = useContext(AuthContext);

  let content = (
    <div className="layout">
      <MainNavigation />
      <div className="child">{props.children}</div>
    </div>
  );

  if (authCtx.isAdmin) {
    content = (
      <div className="layout-admin">
        <MainNavigation />
        <AdminNavigation />
        <div className="child-admin">{props.children}</div>
      </div>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default Layout;
