import "./App.css";
import { Fragment, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./store/auth-context";

// user
import Layout from "./components/Layout/Layout";
import AuthUser from "./components/Auth/AuthUser";
import Homepage from "./components/Homepage/Homepage";
import Guide from "./pages/Guide";
import Profile from "./pages/Profile";
import Antrean from "./pages/Antrean";
import About from "./pages/About";

// admin
import AuthAdmin from "./components/Auth/AuthAdmin";
import Users from "./components/Poli/Users/Users";
import AvailablePoli from "./components/Poli/AvailablePoli";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
            {authCtx.isLoggedIn && <Redirect to="/homepage" />}
          </Route>
          <Route path="/auth">
            {authCtx.isLoggedIn && <Redirect to="/homepage" />}
            {!authCtx.isLoggedIn && <AuthUser />}
          </Route>
        </Switch>

        <Fragment>
          <Switch>
            <Route path="/homepage">
              {authCtx.isLoggedIn && <Homepage />}
              {!authCtx.isLoggedIn && <Redirect to="/auth" />}
            </Route>
            <Route path="/take-antrean">
              {authCtx.isLoggedIn && <Antrean />}
              {!authCtx.isLoggedIn && <Redirect to="/auth" />}
            </Route>
            <Route path="/profile">
              {authCtx.isLoggedIn && <Profile />}
              {!authCtx.isLoggedIn && <Redirect to="/auth" />}
            </Route>
            <Route path="/guide">
              {authCtx.isLoggedIn && <Guide />}
              {!authCtx.isLoggedIn && <Redirect to="/auth" />}
            </Route>
            <Route path="/about">
              {authCtx.isLoggedIn && <About />}
              {!authCtx.isLoggedIn && <Redirect to="/auth" />}
            </Route>
          </Switch>
        </Fragment>

        <Switch>
          <Route path="/login-admin">
            <AuthAdmin />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/poli/:polyId/queue">
            <AvailablePoli />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
