import "../lib/p5.min.js"

let hands, trace, px, py
const START = 61
const END = 1387
const NUM = 5
let friction = 1
let g = 0.0477
let isHandDispaly = false
const lineWidth = 13

class Hand extends p5.Vector {
  constructor(props) {
    super(props.x, props.y)

    let lengthQ, massQ
    if (width > height) {
      lengthQ = height
      massQ = g * 1000
    }
    else {
      lengthQ = ((height + width) - (height - width)) / 2
      massQ = g * 1000 / (height / width)
    }

    this.parent = props.parent || null
    this.child = props.child || null
    this.length = props.length || lengthQ / ((Math.random() + 1.25) * NUM)
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
    const result = (-g * num1 - g * num2 - num3 * num4) / num5
    return result
  }

  getChildAcc() {
    const num1 = 2 * sin(this.parent.angle - this.angle)
    const num2 = (this.parent.vel ** 2) * this.parent.length * (this.parent.mass + this.mass)
    const num3 = (this.parent.mass + this.mass) * cos(this.parent.angle)
    const num4 = (this.vel ** 2) * this.length * this.mass * cos(this.parent.angle - this.angle)
    const num5 = this.length * (2 * this.parent.mass + this.mass - this.mass * cos(2 * this.parent.angle - 2 * this.angle))
    const result = (num1 * (num2 + g * num3 + num4)) / num5
    return result
  }

  update() {
    this.acc = this.getAcc()
    this.vel += this.acc
    this.vel *= friction - (this.vel ** 2)
    this.angle += this.vel
    this.x = this.parent.x + sin(this.angle) * this.length
    this.y = this.parent.y + cos(this.angle) * this.length
  }

  draw() {
    fill(191)
    noStroke()
    circle(this.x, this.y, this.mass/3)
    stroke("#fff3")
    strokeWeight(this.mass/3 + 4)
    line(this.parent.x, this.parent.y, this.x, this.y)
  }
}

function initHands(num) {
  const hands = []
  let handsLength = 0
  for ( let i = 0; i < num; i++ ) {
    if (i === 0) {
      hands.push(new Hand({ parent: { x: width/2, y: 0 } }))
    }
    else {
      hands.push(new Hand({ parent: hands[i-1] }))
      hands[i-1].child = hands[i]
    }
    handsLength += hands[i].length
  }
  hands[0].parent.y = (height - handsLength) / 2
  return hands
}



////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  trace = createGraphics(width, height)
  trace.background(0)
  trace.stroke(255)
  trace.strokeWeight(lineWidth)
  hands = initHands(NUM)
  if (height > width) g *= width / height
}

////////-- UPDATE --////////
function update() {
  px = hands[hands.length-1].x
  py = hands[hands.length-1].y
  for (let hand of hands) {
    if (frameCount < END * 0.8) hand.length -= Math.random() / (37 * (height / width))
    hand.update()
  }
}

////////-- DRAW --////////
window.draw = function() {
  if (frameCount < START) {
    hands && update()
    background(0)
  }
  else if (frameCount > END) {
    noLoop()
  }
  else {
    frameCount < END * 0.8 ? friction -= 0.00001 : friction -= 0.0001
    update()
    image(trace, 0, 0)
    if (isHandDispaly) for (let hand of hands) hand.draw()
    trace.line(hands[hands.length-1].x, hands[hands.length-1].y, px, py)
  }
}

window.windowResized = function() {
  resizeCanvas(windowWidth, windowHeight)
  trace.width = windowWidth
  trace.height = windowHeight
  hands[0].parent.x = width / 2
}



const controls = document.createElement('div')
controls.style.cssText = `
  position: absolute;
  padding: 20px;
  display: flex;
  align-items: baseline;
  gap: 20px;
`
document.body.prepend(controls)

const button = document.createElement('button')
button.textContent = "redraw"
controls.append(button)

const ifHandDispaly = document.createElement("input")
ifHandDispaly.setAttribute("type", "checkbox")
controls.append(ifHandDispaly)



ifHandDispaly.onchange = () => {
  isHandDispaly = !isHandDispaly
  if (frameCount > END) {
    background(0)
    image(trace, 0, 0)
    if (isHandDispaly) for (let hand of hands) hand.draw()
  }
}
button.onclick = () => {
  friction = 1
  g = 0.0477
  frameCount = 0
  hands = initHands(NUM)
  if (height > width) g *= width / height
  trace.background(0)
  loop()
}