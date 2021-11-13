export function getRandomRange(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

export function roundTo(number: number, round: number): number {
  return Math.round(number / round) * round;
}
