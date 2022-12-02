import { createNoise2D } from "https://cdn.skypack.dev/simplex-noise"

const noise2D = createNoise2D()

export const get_noise = (
  x = 0,
  y = 0
) => (
  noise2D(x, y) * 0.5 + 0.5
)

export const get_noiser = (
  x = 0,
  y = 0,
  scale = 1
) => (
  get_noise(x * scale * 0.33333333, y * scale * 0.33333333) *
  get_noise(x * scale, y * scale)
)