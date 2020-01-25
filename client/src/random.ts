export function randomInt(min: number, max: number) {
  return Math.round(min + (max - min) * Math.random())
}
