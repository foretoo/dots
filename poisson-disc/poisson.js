import psd from "https://cdn.skypack.dev/poisson-disk-sampling@2.2.3"
import { get_noiser } from "../assets/noise.js"


const minDistance = 12,
      maxDistance = 72,
      radius = 12,
      margin = 40,
      nscale = 0.01


////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  background(255)
  noStroke()
  noLoop()

  getPoints().forEach(drawCircle)
}


function drawCircle(p) {
  const x = marginPoint(p[0]),
        y = marginPoint(p[1]),
        f = get_noiser(p[0], p[1], nscale),
        size = radius * Math.pow(f, 1.1) * 5,
        bit = (1 - Math.sqrt(f)) * 255

  fill(255, bit, bit)
  circle(x, y, size)
}

function getPoints() {
  return new psd({
    shape: [
      marginSize(width),
      marginSize(height)
    ],
    minDistance,
    maxDistance,
    distanceFunction: (p) => (
      get_noiser(p[0], p[1], nscale)
    )
  }).fill()
}

const marginSize = (size) => size - minDistance - margin * 2
const marginPoint = (point) => point + margin + minDistance / 2