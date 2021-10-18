const circles = []
      _r = 1
      NUM = 7
      MAXNUM = 7777

let   STOPPED = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  fill(191)
  for (let i = 0; i < NUM; i++) {
    const [x, y] = getRandomVector(_r)
    circles.push(new Circle(x, y))
  }
}

function draw() {
  background(0)
  for (circle of circles) {
    circle.update(circles)
    circle.display()
  }
  if (isLooping()) {
    for (let i = 0; i < STOPPED; i++) {
      addNewCircle()
    }
    if (circles.length >= MAXNUM) {
      console.log(`${MAXNUM} circles packed'`)
      noLoop()
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}



//////// GET RANDOM VECTOR ////////

function getRandomVector(r) {
  const x = Math.floor(Math.random()*(width - r * 2)) + r
  const y = Math.floor(Math.random()*(height - r * 2)) + r
  return [x, y]
}



//////// ADD NEW CIRCLE ////////

function addNewCircle() {
  const [x, y] = getRandomVector(_r)
  const newCircle = new Circle(x, y)
  let isValid = true
  for (const other of circles) {
    if (newCircle.dist(other) <= newCircle.r + other.r + 1) {
      isValid = false
      break
    }
  }
  if (isValid) {
    STOPPED--
    circles.push(newCircle)
  }
}



//////// CIRCLE ////////

class Circle extends p5.Vector {
  constructor(...props) {
    super(props[0], props[1])
    this.r = _r
    this.stopped = false
  }

  isEdge() {
    if (
      this.x - this.r <= 1          ||
      this.x + this.r >= width - 1  ||
      this.y - this.r <= 1          ||
      this.y + this.r >= height - 1
    ) {
      STOPPED++
      this.stopped = true
    }
  }

  isOther(others) {
    for (const other of others) {
      if (other != this) {
        if (this.dist(other) <= this.r + other.r + 1) {
          STOPPED += 2
          this.stopped = other.stopped = true
        }
      }
    }
  }

  update(others) {
    if (!this.stopped) {
      this.isOther(others)
      this.isEdge()
      this.r += 0.5
    }
  }

  display() {
    ellipse(this.x, this.y, this.r*2, this.r*2)
  }
}
