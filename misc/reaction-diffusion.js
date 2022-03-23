let   field = []
      next = []

const dA = 0.96
      dB = 0.44
      f  = 0.088
      k  = 0.061

function setup() {
  createCanvas(480, 320)
  pixelDensity(1)
  for ( let y = 0; y < height; y++ ) {
    field[y] = []
    next[y] = []
    for ( let x = 0; x < width; x++ ) {
      field[y][x] = { a: random(1), b: random(.666) }
      next[y][x] = { a: 0, b: 0 }
    }
  }
}

function draw() {
  background(255)
  loadPixels()
  for ( let y = 0; y < height; y++ ) {
    for ( let x = 0; x < width; x++ ) {
      const a = field[y][x].a
            b = field[y][x].b
            lA = laplacian('a', x, y, field)
            lB = laplacian('b', x, y, field)
            r = a * b * b

      next[y][x].a = a + dA * lA - r + f * (1 - a)
      next[y][x].b = b + dB * lB + r - b * (k + f)
      next[y][x].a = constrain(next[y][x].a, 0, 1)
      next[y][x].b = constrain(next[y][x].b, 0, 1)

      const i = (x + y * width) * 4
            c = floor((next[y][x].a - next[y][x].b) * 255)
      pixels[i] = pixels[i + 1] = pixels[i + 2] = c
    }
  }
  updatePixels()
  field = next
}

function laplacian(k, x, y, a) {
  const yU = y - 1 < 0        ? height - 1  : y - 1
        yD = y + 1 == height  ? 0           : y + 1
        xL = x - 1 < 0        ? width - 1   : x - 1
        xR = x + 1 == width   ? 0           : x + 1

  let sum = 0
  sum += a[y][x][k] * -1

  sum += a[yU][x][k] * .2
  sum += a[y][xR][k] * .2
  sum += a[yD][x][k] * .2
  sum += a[y][xL][k] * .2

  sum += a[yU][xL][k] * .05
  sum += a[yU][xR][k] * .05
  sum += a[yD][xR][k] * .05
  sum += a[yD][xL][k] * .05

  return sum
}
