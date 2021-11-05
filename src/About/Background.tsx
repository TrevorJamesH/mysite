import React, { useRef, Fragment } from "react";
import { drawSprites, generateSprites, moveSprite, Sprites } from "../Sprites";
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
    backgroundColor = "black",
    spriteColor: color = "white",
    spriteCount: count = 10,
    spriteSize: size = 10,
    speed = 10,
    length = 40,
    initialOpacity = .2,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useWindowSize();
  const sprites = useRef<Sprites>(
    generateSprites({ count, size, color, speed, length, initialOpacity})
  );

  useAnimation(() => {
    if(canvasRef.current && sprites.current){
      sprites.current = sprites.current.map((sprite) => moveSprite(sprite));
      drawSprites(canvasRef.current, sprites.current, backgroundColor)
    }
  }, 60);

  return (
    <Fragment>
      <canvas
        style={{ position: "fixed" }}
        ref={canvasRef}
        width={width}
        height={height}
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
