import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import "./App.css";

import HomePlansPage from "./components/HomePlansPage";
import HomePlanModal from "./components/HomePlanModal";
import LotsPage from "./components/LotsPage";
import LotModal from "./components/LotModal";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <nav
            style={{
              width: "10vw",
              display: "flex",
              flexDirection: "column",
              padding: "3rem",
              borderRight: "1px solid black",
              height: "100vh",
            }}
          >
            <NavLink to="/homes" activeClassName="currentLocation">
              Home Plans
            </NavLink>
            <NavLink to="/lots" activeClassName="currentLocation">
              Lots
            </NavLink>
          </nav>
          <Switch>
            <Route path="/homes">
              <HomePlansPage></HomePlansPage>
            </Route>
            <Route path="/lots">
              <LotsPage></LotsPage>
            </Route>
            <Route exact path="/">
              <Redirect to="/homes" />
            </Route>
          </Switch>
          <Route path="/" component={HomePlanModal} />
          <Route path="/" component={LotModal} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
