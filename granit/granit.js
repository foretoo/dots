import psd from "https://cdn.skypack.dev/poisson-disk-sampling@2.2.3"
import { get_noiser } from "../assets/noise.js"
import { newarr, random } from "../utils.js"

const nscale = 0.01

let size, mask



window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  background(47)
  noStroke()
  const bgrocks = get_points(3, 1.5, 6)
    .map((p) => get_rock_points(p[0], p[1], 3, 5))
  draw_rocks(bgrocks, () => fill(11))



  size = Math.min(width, height) / 1.618
  mask = createGraphics(width, height)
  mask.stroke(255)
  mask.strokeWeight(size / 4 | 0)
  const bigrocks = get_points(size, 2.5, 5)
    .map((p) => get_rock_points(p[0], p[1], size, 7))
  draw_rocks(bigrocks, (mask) => mask.fill(255), mask)



  const midrocks = get_masked_points(8, 2, 40, mask)
    .map((p) => get_rock_points(p[0], p[1], 8, 9))
  draw_rocks(bigrocks, () => fill(11))
  draw_rocks(midrocks, () => fill("#a77"))
}



function get_masked_points(size, min, max, mask) {
  mask.loadPixels()
  return get_points(size, min, max, (p) => {
    const d = pixelDensity(),
          x = Math.round(p[0]),
          y = Math.round(p[1]),
          pnoise = get_noiser(p[0], p[1], nscale) / 4,
          pmask = mask.pixels[(x + width * d * y) * 4 * d] / 255

    return pmask + pnoise
  })
}
function get_points(size, min, max, distanceFunction) {
  return new psd({
    shape: [ width, height ],
    minDistance: size * min,
    maxDistance: size * max,
    distanceFunction
  }).fill()
}
function get_rock_points(x, y, r, n) {
  const theangle = random(Math.PI)
  const angles = newarr(n, () => random(Math.PI * 2)).sort()
  return angles.map((a) => [
    x + r * Math.sin(a + theangle),
    y + r * Math.cos(a + theangle)
  ])
}
function draw_rocks(rocks, color, l) {
  rocks.forEach((rock) => {
    color(l)
    if (l) {
      l.beginShape()
      rock.forEach((p) => l.vertex(p[0], p[1]))
      l.endShape(CLOSE)
    }
    else {
      beginShape()
      rock.forEach((p) => vertex(p[0], p[1]))
      endShape(CLOSE)
    }
  })
}