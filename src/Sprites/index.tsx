import { getRandomRange, roundTo } from "../utility";

export const directions = ["up", "down", "left", "right"] as const;
export type Direction = typeof directions[number];

export interface Coords {
  x: number;
  y: number;
}

export interface Size {
  height: number,
  width: number,
}

export interface Sprite {
  coords: Coords;
  direction: Direction;
  color: string;
  speed: number;
  size: number;
  initialOpacity: number;
  opacity: number;
  offset?: number;
  tail?: Sprites;
  length: number;
}

export type Sprites = Sprite[];

export type SpritesParams = {
  count?: number;
  color?: string | string[];
  speed?: number;
  size: number;
  length: number;
  initialOpacity?: number;
  canvasSize: Size;
};

export type SpriteParams = Partial<Pick<Sprite, "speed" | "size" | "color"| "length" | "initialOpacity">> & {canvasSize: Size};

const xWays: Array<Direction> = ["left", "right"];
const yWays: Array<Direction> = ["up", "down"];

function generateSprite({
  color = "white",
  size = 10,
  speed = 10,
  length = 40,
  initialOpacity = .2,
  canvasSize
}: SpriteParams): Sprite {
  const { height, width } = canvasSize;
  const x = roundTo(getRandomRange(0, width), size);
  const y = roundTo(getRandomRange(0, height), size);
  const direction = directions[getRandomRange(0, directions.length - 1)];
  const sprite = { coords: { x, y }, direction, color, speed, size, opacity: initialOpacity, initialOpacity, length };
  const spriteWithTail = generateTail(sprite, canvasSize)
  return spriteWithTail;
}

export function generateSprites({ count = 10, color = 'white', ...spriteParams }: SpritesParams): Sprites {
  return new Array(count).fill(null).map((n, index) => {
    const spriteColor = Array.isArray(color)
      ? color[index % color.length]
      : color;
    return generateSprite({ ...spriteParams, color: spriteColor });
  });
}

function generateTail(sprite: Sprite, canvasSize: Size){
  const tailLength = sprite.length - 1
  let spriteWithTail = sprite
  while((spriteWithTail.tail?.length || 0) < tailLength){
    spriteWithTail = moveSprite(spriteWithTail, canvasSize)
  }
  return spriteWithTail
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

export type Mover = (distance: number, size: number, coords: Coords, canvasSize: Size) => Coords;
const movers: Record<Direction, Mover> = {
  up: (distance, size, { x, y }, canvasSize) => {
    if (y > canvasSize.height + size) {
      return { x, y: 0 };
    }
    return { x, y: y + distance };
  },
  down: (distance, size, { x, y }, canvasSize) => {
    if (y < 0) {
      return { x, y: roundTo(canvasSize.height, size) + size };
    }
    return { x, y: y - distance };
  },
  left: (distance, size, { x, y }, canvasSize) => {
    if (x < 0) {
      return { x: roundTo(canvasSize.width, size) + size, y };
    }
    return { x: x - distance, y };
  },
  right: (distance, size, { x, y }, canvasSize) => {
    if (x > canvasSize.width + size) {
      return { x: 0, y };
    }
    return { x: x + distance, y };
  },
};

function updateTail(sprite: Sprite): Sprites {
  const { tail = [], ...restOfSprite } = sprite;
  const shrinkRate = sprite.initialOpacity / sprite.length
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

function moveSprite(sprite: Sprite, canvasSize: Size): Sprite {
  const { direction, speed, size, coords } = sprite;
  return {
    ...sprite,
    tail: updateTail(sprite),
    coords: movers[direction](speed, size, coords, canvasSize),
    direction: maybeTurn(direction),
  };
}

export const moveSprites = (sprites: Sprites, canvasSize: Size): Sprites => sprites.map(sprite => moveSprite(sprite, canvasSize))

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

export const drawSprites = (canvas: HTMLCanvasElement, sprites: Sprites, backgroundColor = 'black') => {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = backgroundColor;
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  sprites.forEach((sprite) => drawSprite(ctx, sprite));
}