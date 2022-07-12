import SimplexNoise from "https://cdn.skypack.dev/simplex-noise"

const simplex = new SimplexNoise()

export const get_noise = (x = 0, y = 0) => (
  ( simplex.noise2D(x, y) + 1 ) / 2
)
export const get_noiser = (x = 0, y = 0, scale = 1) => (
  Math.pow(
    get_noise(x * scale / 3, y * scale / 3) * 1.3 +
    get_noise(x * scale, y * scale) * 0.7,
    2
  ) / 4
)