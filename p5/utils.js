export const clamp = (value, min, max) => (
  value < min ? min : value > max ? max : value
)