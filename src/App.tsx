import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import About from "./About";
import useFaviconSprites from "./Sprites/useFaviconSprites";

function App() {
  useFaviconSprites();

  return (
    <>
      <Router>
        <Switch>
          <Route path="/about-me">
            <About />
          </Route>
          <Redirect to={"/about-me"} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
