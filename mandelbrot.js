
const scale = 2
      iterations = 100

function setup() {
  const minSide = min(windowWidth, windowHeight)
  createCanvas(minSide, minSide)
}

function draw() {
  loadPixels()
  for ( let x = 0; x < width; x++ ) {
    for ( let y = 0; y < height; y++ ) {

      let b = map(x, 0, width, -scale, scale)
          a = map(y, 0, height, -scale, scale)

      const ca = a
            cb = b

      let n = 0
      while ( n < iterations ) {
        const aa = a * a - b * b
              bb = 2 * a * b

        a = aa + ca
        b = bb + cb

        if ( (a * a + b * b) > 4 ) break
        n++
      }

      const bright = n === iterations ? 0 : map(n, 0, iterations, 0, 255)
      const i = (x + y * width) * 4
      pixels[i] = pixels[i + 1] = pixels[i + 2] = bright
      pixels[i + 3] = 255
    }
  }
  updatePixels()
  noLoop()
}
