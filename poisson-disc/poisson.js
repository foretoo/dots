import psd from "https://cdn.skypack.dev/poisson-disk-sampling@2.2.3";

const colors = [ "#fb7", "#4a7", "#258" ],
      minDistance = 20,
      maxDistance = 20,
      radius = 20



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
    shape: [ width - minDistance, height - minDistance ],
    minDistance,
    maxDistance,
  }).fill().forEach(point => {
    fill(random(colors))
    circle(point[0] + minDistance / 2, point[1] + minDistance / 2, radius)
  })
}



////////-- DRAW --////////
// window.draw = function() {
// }