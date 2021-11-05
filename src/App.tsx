import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import About from "./About";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/About">
          <About />
        </Route>
        <Redirect to={"/About"} />
      </Switch>
    </Router>
  );
}

export default App;
