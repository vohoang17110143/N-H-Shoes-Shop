import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./scss/style.scss";
import "./App.css";

const TheLayout = React.lazy(() => import("./Components/TheLayout"));
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

var hours = 24; // Reset when storage is more than
var now = new Date().getTime();
var setupTime = localStorage.getItem("setupTime");
if (setupTime == null) {
  localStorage.setItem("setupTime", now);
} else {
  if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.clear();
    localStorage.setItem("setupTime", now);
  }
}
class App extends Component {
  render() {
    return (
      <Router>
        {/* load component */}
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
