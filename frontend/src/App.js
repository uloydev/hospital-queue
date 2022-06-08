import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Auth from "./components/Auth/Auth";
import Homepage from "./components/Homepage/Homepage";

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
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
