import { useRef, useEffect } from "react";
import { Sprites, generateSprites, moveSprites, drawSprites } from ".";
import { themeColors, faviconSize } from "../constants";
import { useAnimation } from "../Utility/hooks";

const useFaviconSprites = () => {
  const favicon: any = window.document.querySelector("link[rel*='icon']")!;

  const canvasRef = useRef<HTMLCanvasElement>(
    document.createElement("CANVAS") as HTMLCanvasElement
  );

  const sprites = useRef<Sprites>(
    generateSprites({
      count: themeColors.length,
      color: themeColors,
      size: 2,
      length: 15,
      speed: 1,
      canvasSize: faviconSize,
    })
  );

  useEffect(() => {
    canvasRef.current.height = faviconSize.height;
    canvasRef.current.width = faviconSize.width;
  }, []);

  useAnimation(() => {
    sprites.current = moveSprites(sprites.current, faviconSize);
    drawSprites(canvasRef.current, sprites.current);
    favicon.href = canvasRef.current.toDataURL("image/png");
  }, 10);
};

export default useFaviconSprites;
