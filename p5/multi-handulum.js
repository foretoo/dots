let hands, trace, px, py
const START = 61
const END = 1334
const NUM = 5
const GR = 0.0333
let f = 1.001

class Hand extends p5.Vector {
  constructor(props) {
    super(props.x, props.y)
    const lengthQ = Math.floor(NUM * 1.5)
    const massQ = GR * 1000
    this.parent = props.parent || null
    this.child = props.child || null
    this.length = props.length || width / (lengthQ + Math.random() * lengthQ)
    this.mass = props.mass || massQ + Math.random() * massQ
    this.angle = props.angle || Math.PI * (Math.random() - 0.5) * 2
    this.x = this.parent.x + sin(this.angle) * this.length
    this.y = this.parent.y + cos(this.angle) * this.length
    this.vel = 0
    this.acc = 0
    this.getAcc = this.parent.length ? this.getChildAcc : this.getParentAcc
  }

  getParentAcc() {
    const num1 = (2 * this.mass + this.child.mass) * sin(this.angle)
    const num2 = this.child.mass * sin(this.angle - 2 * this.child.angle)
    const num3 = 2 * this.child.mass * sin(this.angle - this.child.angle)
    const num4 = (this.child.vel ** 2) * this.child.length + (this.vel ** 2) * this.length * cos(this.angle - this.child.angle)
    const num5 = this.length * (2 * this.mass + this.child.mass - this.child.mass * cos(2 * this.angle - 2 * this.child.angle))
    const result = (-GR * num1 - GR * num2 - num3 * num4) / num5
    return result
  }

  getChildAcc() {
    const num1 = 2 * sin(this.parent.angle - this.angle)
    const num2 = (this.parent.vel ** 2) * this.parent.length * (this.parent.mass + this.mass)
    const num3 = (this.parent.mass + this.mass) * cos(this.parent.angle)
    const num4 = (this.vel ** 2) * this.length * this.mass * cos(this.parent.angle - this.angle)
    const num5 = this.length * (2 * this.parent.mass + this.mass - this.mass * cos(2 * this.parent.angle - 2 * this.angle))
    const result = (num1 * (num2 + GR * num3 + num4)) / num5
    return result
  }

  update() {
    this.acc = this.getAcc()
    this.vel += this.acc
    this.vel *= f - (this.vel ** 2)
    this.angle += this.vel
    this.x = this.parent.x + sin(this.angle) * this.length
    this.y = this.parent.y + cos(this.angle) * this.length
  }
}

function initHands(num) {
  const hands = []
  for ( let i = 0; i < num; i++ ) {
    if (i === 0) {
      hands.push(new Hand({ parent: { x: width/2, y: height/4 } }))
    }
    else {
      hands.push(new Hand({ parent: hands[i-1] }))
      hands[i-1].child = hands[i]
    }
  }
  return hands
}



////////-- SETUP --////////
function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  noStroke()
  trace = createGraphics(width, height)
  trace.background(0)
  trace.stroke(255)
  trace.strokeWeight(7)
  hands = initHands(NUM)
}

////////-- UPDATE --////////
function update() {
  f -= 0.00001
  px = hands[hands.length-1].x
  py = hands[hands.length-1].y
  hands[0].angle += (Math.random() - 0.5) * (Math.PI / 180 * f)
  for (hand of hands) {
    hand.length -= Math.random() / 25
    hand.update()
  }
}

////////-- DRAW --////////
function draw() {
  if (frameCount > START && frameCount < END) {
    update()
    trace.line(hands[hands.length-1].x, hands[hands.length-1].y, px, py)
    image(trace, 0, 0)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  trace.width = windowWidth
  trace.height = windowHeight
  hands[0].parent.x = width/2
}
