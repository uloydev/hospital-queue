import { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import "./Navigation.css";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    history.push("/auth");
  };

  return (
    <div className="header">
      <div className="title">Klinik Al Barokah</div>
      {authCtx.isLoggedIn && (
        <div className="title logout" onClick={logoutHandler}>
          Logout
        </div>
      )}
    </div>
  );
};

export default MainNavigation;
