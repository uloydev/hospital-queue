import { createContext, useState, useCallback } from "react";

let logoutTimer;

const AuthContext = createContext({
  userId: "",
  isAdmin: false,
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  denyOrder: () => {},
});

const calculateExpiringTime = (expiringTime) => {
  const currentTime = new Date().getTime();
  const timeExpiring = new Date(expiringTime).getTime();

  return timeExpiring - currentTime;
};

const retrivedStoredToken = () => {
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin");
  const storedToken = localStorage.getItem("token");
  const expiringTime = localStorage.getItem("expiringTime");

  const reminingTime = calculateExpiringTime(expiringTime);

  if (reminingTime <= 0) {
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("permOrder");
    localStorage.removeItem("token");
    localStorage.removeItem("expiringTime");

    return null;
  }

  return {
    userId: userId,
    isAdmin: isAdmin,
    token: storedToken,
    duration: expiringTime,
  };
};

export const AuthContextProvider = (props) => {
  const dataToken = retrivedStoredToken();
  let initialToken, initialUserId, initialAdmin;
  if (dataToken) {
    initialToken = dataToken.token;
    initialUserId = dataToken.userId;
    initialAdmin = dataToken.isAdmin;
  }

  const [tokenVal, setTokenVal] = useState(initialToken);
  const [userIdVal, satUserIdVal] = useState(initialUserId);
  const [isAdminVal, setIsAdminVal] = useState(initialAdmin);

  const userIsLoggedIn = !!tokenVal;
  const userIsAdmin = !!isAdminVal;

  const loginHandler = (userId, token, isAdmin, expiringTime) => {
    setTokenVal(token);
    satUserIdVal(userId);
    setIsAdminVal(isAdmin);

    localStorage.setItem("userId", userId);
    if (isAdmin) {
      localStorage.setItem("isAdmin", "1");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("expiringTime", expiringTime);

    const reminingTime = calculateExpiringTime(expiringTime);

    logoutTimer = setTimeout(logoutHandler, reminingTime);
  };

  const logoutHandler = useCallback(() => {
    setTokenVal(null);
    setIsAdminVal(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("expiringTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const contextValue = {
    userId: userIdVal,
    isAdmin: userIsAdmin,
    token: tokenVal,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
