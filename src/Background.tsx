import React, { useRef, Fragment } from "react";
import { useAnimation, useWindowSize, getRandomRange } from "./utility";

interface IProps {
	backgroundColor?: string;
	spriteColor?: string | string[];
	spriteCount?: number;
	spriteSize?: number;
	speed?: number;
}

const Background: React.FC<IProps> = (props) => {
	const {
		backgroundColor = "black",
		spriteColor: color = "white",
		spriteCount: count = 10,
		spriteSize: size = 10,
		speed,
	} = props;

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const sprites = useRef<Sprites>(
		generateSprites({ count, size, color, speed })
	);

	useAnimation(() => {
		if (sprites.current && canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = backgroundColor;
			ctx.globalAlpha = 1;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			sprites.current = sprites.current.map((sprite) => move(sprite));
			sprites.current.forEach((sprite) => drawSprite(ctx, sprite));
		}
	}, 60);

	const { width, height } = useWindowSize();

	return (
		<Fragment>
			<canvas
				style={{ position: "fixed" }}
				ref={canvasRef}
				width={width}
				height={height}
			/>
			<div style={{ position: "relative", zIndex: 10 }}>{props.children}</div>
		</Fragment>
	);
};

const directions = ["up", "down", "left", "right"] as const;
type Direction = typeof directions[number];

interface Coords {
	x: number;
	y: number;
}
interface Sprite {
	coords: Coords;
	direction: Direction;
	color: string;
	speed: number;
	size: number;
	opacity: number;
	offset?: number;
	tail?: Sprites;
}

type Sprites = Sprite[];

const xWays: Array<Direction> = ["left", "right"];
const yWays: Array<Direction> = ["up", "down"];

type SpriteParams = Partial<Pick<Sprite, "speed" | "size" | "color">>;

function generateSprite({
	color = "White",
	size = 10,
	speed = 10,
}: SpriteParams = {}): Sprite {
	const x = getRandomRange(0, window.innerWidth);
	const y = getRandomRange(0, window.innerHeight);
	const direction = directions[getRandomRange(0, directions.length - 1)];
	const opacity = 0.2;
	return { coords: { x, y }, direction, color, speed, size, opacity };
}

// TODO: figure out how to extend this from SpriteParams
type SpritesParams = {
	count?: number;
	color?: string | string[];
	speed?: number;
	size?: number;
};

function generateSprites(params: SpritesParams): Sprites {
	const { count, color, ...spriteParams } = params;
	return new Array(count).fill(null).map((n, index) => {
		const spriteColor = Array.isArray(color)
			? color[index % color.length]
			: color;
		return generateSprite({ ...spriteParams, color: spriteColor });
	});
}

const turns: Record<Direction, Array<Direction>> = {
	up: xWays,
	down: xWays,
	left: yWays,
	right: yWays,
};

function maybeTurn(direction: Direction): Direction {
	if (getRandomRange(0, 50) === 50) {
		return turns[direction][getRandomRange(0, turns[direction].length - 1)];
	}
	return direction;
}

type Mover = (distance: number, size: number, coords: Coords) => Coords;
const movers: Record<Direction, Mover> = {
	up: (distance, size, { x, y }) => {
		if (y > window.innerHeight + size) {
			return { x, y: 0 };
		}
		return { x, y: y + distance };
	},
	down: (distance, size, { x, y }) => {
		if (y < 0) {
			return { x, y: window.innerHeight + size };
		}
		return { x, y: y - distance };
	},
	left: (distance, size, { x, y }) => {
		if (x < 0) {
			return { x: window.innerWidth + size, y };
		}
		return { x: x - distance, y };
	},
	right: (distance, size, { x, y }) => {
		if (x > window.innerWidth + size) {
			return { x: 0, y };
		}
		return { x: x + distance, y };
	},
};

const shrinkRate = 0.005;
function updateTail(sprite: Sprite): Sprites {
	const { tail = [], ...restOfSprite } = sprite;
	const newTail = [restOfSprite].concat(tail).map((tailNode) => {
		const { size, offset = 0, opacity } = tailNode;
		return {
			...tailNode,
			size,
			offset,
			opacity: opacity - shrinkRate,
		};
	});

	return newTail.filter((tailNode) => tailNode.opacity > 0);
}

function move(sprite: Sprite): Sprite {
	const { direction, speed, size, coords } = sprite;
	return {
		...sprite,
		tail: updateTail(sprite),
		coords: movers[direction](speed, size, coords),
		direction: maybeTurn(direction),
	};
}

function drawSprite(ctx: CanvasRenderingContext2D, sprite: Sprite) {
	const {
		color,
		coords: { x, y },
		size,
		tail = [],
		offset = 0,
		opacity,
	} = sprite;
	ctx.fillStyle = color;
	ctx.globalAlpha = opacity;
	ctx.fillRect(x + offset, y + offset, size, size);
	tail.forEach((tailNode) => drawSprite(ctx, tailNode));
}

export default Background;
