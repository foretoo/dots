const count = 32
const velocity = Math.PI / 18000
let halfHeight, size, x, y

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  size = width / count
  halfSize = size / 2
  halfHeight = windowHeight / 2
  angle = 0
}

function draw() {
  background(0)
  fill(191)

  for (x = halfSize; x <= width - halfSize; x += size) {
    // 1. sin((frameCount / period) * Math.PI * 2) — to set velocity by a period
    // 2. x / width — to get offset for each particle
    angle += velocity
    y = map( sin((angle - x / width / 2) * Math.PI * 2), -1, 1, halfSize, height - halfSize )
    circle(x, y, size)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  size = width / count
  halfSize = size / 2
  halfHeight = windowHeight / 2
}
