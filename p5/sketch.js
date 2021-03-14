function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  noCursor()
  noStroke()
}

function draw() {
  background(255)
  fill(191)
  circle(mouseX, mouseY, 20)
}
