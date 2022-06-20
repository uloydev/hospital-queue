import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
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
import PoliGigi from "./components/Poli/Gigi/PoliGigi";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/auth" />
          </Route>
          <Route path="/auth">
            <AuthUser />
          </Route>
        </Switch>
        <Switch>
          <Route path="/homepage">
            <Homepage />
          </Route>
          <Route path="/take-antrean">
            <Antrean />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/guide">
            <Guide />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
        <Switch>
          <Route path="/login-admin">
            <AuthAdmin />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/poli-gigi">
            <PoliGigi />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
