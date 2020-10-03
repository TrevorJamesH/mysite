import { useEffect, useState, useRef } from "react";

/* ===utility functions=== */

export function getRandomRange(min: number, max: number): number {
	return Math.round(Math.random() * (max - min) + min);
}

/* ===custom hooks=== */

export function useAnimation(drawFrame: () => void) {
	const requestRef = useRef(0);

	function animate() {
		drawFrame();
		requestRef.current = requestAnimationFrame(animate);
	}

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current);
	}, []);
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
			window.onresize = () => {};
		};
	}, []);
	return { width, height };
}
