const radius = 100
const delta = 0.05
let angle = 0.0

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
}

function draw() {
  angle += delta
  const [ x, y ] = [ radius * cos(angle), radius * sin(angle) ]

  background(0)
  translate(width/2, height/2)
  fill(191)
  circle(x, y, 20)
  stroke(191)
  line(0, 0, x, y)
}
