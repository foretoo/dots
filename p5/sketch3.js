const count = 32
const period = 200
let halfHeight, size, x, y

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  size = width / count
  halfSize = size / 2
  halfHeight = windowHeight / 2
}

function draw() {
  background(0)
  fill(191)

  for (x = halfSize; x <= width - halfSize; x += size) {
    // 1. halfHeight — to het center
    // 2. (halfHeight - halfSize) — amplitude
    // 3. sin((frameCount / period) * Math.PI * 2) — to set velocity by a period
    // 4. x / width — to get offset for each particle
    y = halfHeight + (halfHeight - halfSize) * sin((frameCount / period - x / width / 2) * Math.PI * 2)
    circle(x, y, size)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  size = width / count
  halfSize = size / 2
  halfHeight = windowHeight / 2
}
