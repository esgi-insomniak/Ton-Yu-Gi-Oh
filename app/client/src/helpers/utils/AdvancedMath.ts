export const round = (value: number, precision: number = 3): number =>
  parseFloat(value.toFixed(precision));
export const clamp = (value: number, min: number = 0, max: number = 100): number =>
  Math.min(Math.max(value, min), max);
export const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

export default {
  round,
  clamp,
  adjust,
};