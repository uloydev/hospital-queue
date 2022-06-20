import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Auth from "./components/Auth/Auth";
import Homepage from "./components/Homepage/Homepage";
import Guide from "./pages/Guide";
import Profile from "./pages/Profile";
import Antrean from "./pages/Antrean";
import About from "./pages/About";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/auth" />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
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
      </Layout>
    </div>
  );
};

export default App;
