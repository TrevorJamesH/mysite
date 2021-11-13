import { useEffect, useState, useRef, useMemo, useCallback } from "react";

/* ===utility functions=== */

export function getRandomRange(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

/* ===custom hooks=== */

export function useAnimation(drawFrame: () => void, fps?: number) {
  const request = useRef(0);
  const lastRender = useRef(new Date().getTime());

  const waitTime = useMemo(() => fps && 1000 / fps, [fps]);

  const animate = useCallback(() => {
    if (!waitTime || new Date().getTime() - lastRender.current > waitTime) {
      drawFrame();
      lastRender.current = new Date().getTime();
    }
    request.current = requestAnimationFrame(animate);
  },[drawFrame, waitTime]);

  useEffect(() => {
    request.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(request.current);
  }, [animate]);
}

export function useWindowSize() {
  const [{ width, height }, resize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    window.onresize = () =>
      resize(() => ({
        height: window.innerHeight,
        width: window.innerWidth,
      }));
    return () => {
      window.onresize = () => { };
    };
  }, []);
  return { width, height };
}
