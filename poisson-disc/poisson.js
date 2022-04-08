import psd from "https://cdn.skypack.dev/poisson-disk-sampling@2.2.3";

const colors = [ "#fb7", "#4a7", "#258" ],
      minDistance = 20,
      maxDistance = 20,
      radius = 20,
      margin = 40



////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  background("#111")
  noStroke()
  noLoop()
  

  drawPoints()
}

function drawPoints() {
  new psd({
    shape: [
      width - minDistance - margin * 2,
      height - minDistance - margin * 2
    ],
    minDistance,
    maxDistance,
  }).fill().forEach(point => {
    fill(random(colors))
    circle(
      point[0] + margin + minDistance / 2,
      point[1] + margin + minDistance / 2,
      radius
    )
  })
}



////////-- DRAW --////////
// window.draw = function() {
// }