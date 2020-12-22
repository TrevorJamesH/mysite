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

  const animate = useRef(() => {
    if (!waitTime || new Date().getTime() - lastRender.current > waitTime) {
      drawFrame();
      lastRender.current = new Date().getTime();
    }
    request.current = requestAnimationFrame(animate.current);
  });

  useEffect(() => {
    request.current = requestAnimationFrame(animate.current);
    return () => cancelAnimationFrame(request.current);
  }, []);
}

export function useDebounce(callback: () => void, pauseTime: number) {
  const timeout = useRef<number | null>(null)

  return () => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = window.setTimeout(callback, pauseTime)
  }
}

export function useWindowSize() {
  const [{ width, height }, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const resize = useCallback(() => setSize({
    height: window.innerHeight,
    width: window.innerWidth,
  }), [])

  const setWindowSize = useDebounce(resize, 50);

  useEffect(() => {
    window.addEventListener('resize', setWindowSize);
    return () => {
      window.removeEventListener('resize', setWindowSize)
    };
  }, []);
  return { width, height };
}
