import React, { useRef, Fragment } from "react";
import { drawSprites, generateSprites, moveSprites, Sprites } from "../Sprites";
import { useAnimation, useWindowSize } from "../utility";

interface IProps {
  backgroundColor?: string;
  spriteColor?: string | string[];
  spriteCount?: number;
  spriteSize?: number;
  speed?: number;
  length?: number;
  initialOpacity?: number;
}

const Background: React.FC<IProps> = (props) => {
  const {
    backgroundColor,
    spriteColor: color,
    spriteCount: count,
    spriteSize: size = 10,
    speed = 10,
    length = 40,
    initialOpacity = .2,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const windowSize = useWindowSize();
  const sprites = useRef<Sprites>(
    generateSprites({ count, size, color, speed, length, initialOpacity, canvasSize: windowSize})
  );

  useAnimation(() => {
    if(canvasRef.current && sprites.current){
      sprites.current = moveSprites(sprites.current, windowSize)
      drawSprites(canvasRef.current, sprites.current, backgroundColor)
    }
  }, 60);

  return (
    <Fragment>
      <canvas
        style={{ position: "fixed" }}
        ref={canvasRef}
        width={windowSize.width}
        height={windowSize.height}
      />
      <div
        style={{
          position: "relative",
          zIndex: 10,
        }}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default Background;
