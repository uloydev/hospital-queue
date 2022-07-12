import { createContext, useState, useCallback } from "react";

let logoutTimer;

const AuthContext = createContext({
  userId: "",
  name: "",
  email: "",
  address: "",
  phone: "",
  isAdmin: false,
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  changeData: () => {},
});

const retrivedStoredToken = () => {
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin");
  const storedToken = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");
  const address = localStorage.getItem("address");

  return {
    userId,
    isAdmin,
    token: storedToken,
    name,
    email,
    phone,
    address,
  };
};

export const AuthContextProvider = (props) => {
  const dataToken = retrivedStoredToken();
  let initialToken,
    initialUserId,
    initialAdmin,
    initialName,
    initialEmail,
    initialAddress,
    initialPhone;
  if (dataToken) {
    initialToken = dataToken.token;
    initialUserId = dataToken.userId;
    initialAdmin = dataToken.isAdmin;
    initialName = dataToken.name;
    initialEmail = dataToken.email;
    initialAddress = dataToken.address;
    initialPhone = dataToken.phone;
  }

  const [tokenVal, setTokenVal] = useState(initialToken);
  const [userIdVal, satUserIdVal] = useState(initialUserId);
  const [nameVal, setNameVal] = useState(initialName);
  const [emailVal, setEmailVal] = useState(initialEmail);
  const [addressVal, setAddressVal] = useState(initialAddress);
  const [phoneVal, setPhoneVal] = useState(initialPhone);
  const [isAdminVal, setIsAdminVal] = useState(initialAdmin);

  const userIsLoggedIn = !!tokenVal;
  const userIsAdmin = !!isAdminVal;

  const loginHandler = (
    userId,
    token,
    isAdmin,
    name,
    email,
    phone,
    address
  ) => {
    setTokenVal(token);
    satUserIdVal(userId);
    setIsAdminVal(isAdmin);
    setNameVal(name);
    setEmailVal(email);
    setPhoneVal(phone);
    setAddressVal(address);

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("address", address);
    localStorage.setItem("phone", phone);

    if (isAdmin) {
      localStorage.setItem("isAdmin", "1");
    }
  };

  const logoutHandler = useCallback(() => {
    setTokenVal(null);
    setIsAdminVal(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const changeDataHandler = ({ name, phone, address }) => {
    localStorage.removeItem("name");
    localStorage.removeItem("phone");
    localStorage.removeItem("address");
    localStorage.setItem("name", name);
    localStorage.setItem("address", address);
    localStorage.setItem("phone", phone);

    setNameVal(name);
    setPhoneVal(phone);
    setAddressVal(address);
  };

  const contextValue = {
    userId: userIdVal,
    name: nameVal,
    email: emailVal,
    address: addressVal,
    phone: phoneVal,
    isAdmin: userIsAdmin,
    token: tokenVal,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    changeData: changeDataHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
