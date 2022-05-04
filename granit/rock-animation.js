import { get_noise } from "../assets/noise.js"
import { newarr } from "../utils.js"

const simplex = new SimplexNoise()
let radius



////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  radius = Math.min(width, height) / 3
}

////////-- DRAW --////////
window.draw = function() {
  background("#111")
  noStroke()
  fill(255)
  animate_rock(width / 2, height / 2, radius, 7)
  
  noFill()
  stroke(255)
  strokeWeight(2)
  circle(width / 2, height / 2, radius * 2)
}



const animate_rock = (x, y, r, n) => {
  const f = frameCount * 0.001
  const sides = newarr(n, (_, i) =>
    get_noise(i, f) * Math.PI * 2
  ).sort()
  
  beginShape()
  sides.forEach((a) => {
    vertex(
      x + r * Math.sin(a + f),
      y + r * Math.cos(a + f)
    )
  })
  endShape(CLOSE)
}