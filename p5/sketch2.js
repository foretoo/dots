const amplitude = 200
const period = 200

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
}

function draw() {
  const x = amplitude * sin((frameCount / period) * Math.PI*2)

  background(0)
  translate(width/2, height/2)
  fill(191)
  circle(x, 0, 20)
  stroke(191)
  line(0, 0, x, 0)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
