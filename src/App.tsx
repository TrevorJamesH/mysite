import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import HireMe from "./HireMe";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/HireMe">
          <HireMe />
        </Route>
        <Redirect to={"/HireMe"} />
      </Switch>
    </Router>
  );
}

export default App;
