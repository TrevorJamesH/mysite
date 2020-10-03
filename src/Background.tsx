import React, { useEffect } from "react";
import { getRandomRange } from "./utility";

type Direction = "up" | "down" | "left" | "right";
interface Coords {
	x: number;
	y: number;
}
interface Sprite {
	coords: Coords;
	color: string;
	direction: Direction;
}

const directions = ["up", "down", "left", "right"] as const;

type Sprites = Sprite[];

function generateSprite(): Sprite {
	const x = getRandomRange(0, window.innerWidth);
	const y = getRandomRange(0, window.innerHeight);
	const direction = directions[getRandomRange(0, directions.length)];
	const color = "black";
	return { coords: { x, y }, direction, color };
}

function generateSprites(n: number): Sprites {
	return new Array(n).fill(generateSprite());
}

// function move(direction: Direction, distance: number, {x,y}){

// }
const move = {
	up: (distance: number, { x, y }) => ({ x, y: y + distance }),
};

const Background = (props: any) => {
	// some canvas methods don't seem to exist on HTMLCanvasElement type
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const requestRef = React.useRef(0);
	const sprites = React.useRef<Sprites>(generateSprites(10));

	const animate = () => {
		if (sprites.current[0] && canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			ctx?.clearRect(0, 0, canvas.width, canvas.height);
			const { x, y } = sprites.current[0];
			sprites.current[0] = { ...sprites.current[0], x: x - 10 };

			console.log(x, y);
			ctx?.fillRect(x, y, 10, 10);
		}

		requestRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current);
	}, []);

	return (
		<canvas
			style={{ display: "block" }}
			ref={canvasRef}
			width={window.innerWidth}
			height={window.innerHeight}
			onClick={(event) => {
				const { clientX: x, clientY: y } = event;
				console.log("setting sprite", x, y);
				sprites.current[0] = { x, y, color: "black", direction: "left" };
			}}
		/>
	);
};

export default Background;
