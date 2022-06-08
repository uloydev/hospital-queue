import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
