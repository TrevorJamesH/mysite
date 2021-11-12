import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import About from "./About";
import { faviconSize, themeColors } from "./constants";
import { drawSprites, generateSprites, moveSprites, Sprites } from "./Sprites";
import { useAnimation } from "./utility";

function App() {
  const favicon: any = window.document.querySelector("link[rel*='icon']")!
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement("CANVAS") as HTMLCanvasElement);
  const sprites = useRef<Sprites>(
    generateSprites({ count: themeColors.length, color: themeColors, size: 2, length: 15, speed: 1, canvasSize: faviconSize})
  );

  useEffect(() => {
    console.log('canvasRef',canvasRef.current)
    canvasRef.current.height = faviconSize.height
    canvasRef.current.width = faviconSize.width
  },[])

  useAnimation(() => {
    if(canvasRef.current && sprites.current){
      sprites.current = moveSprites(sprites.current, faviconSize)
      drawSprites(canvasRef.current, sprites.current)
      favicon.href = canvasRef.current.toDataURL('image/png');
    }
  }, 10);
  
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
