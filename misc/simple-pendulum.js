let origin,
    bob,
    arm,
    aPos = Math.PI / 3,
    aVel = 0.0,
    aAcc = 0.0,
    c = -0.667,
    friction = 0.997

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  origin = new p5.Vector(width/2, 0)
  arm = height / 2
  bob = new p5.Vector(origin.x + sin(aPos) * arm, origin.y + cos(aPos) * arm)
}

function update() {
  aAcc = (c / arm) * sin(aPos) // from pendulum force formula
  aVel += aAcc
  aVel *= friction
  aPos += aVel

  bob.x = origin.x + sin(aPos) * arm
  bob.y = origin.y + cos(aPos) * arm
}

function draw() {
  update()
  background(0)
  fill(191)
  circle(bob.x, bob.y, 20)
  stroke(191)
  line(origin.x, origin.y, bob.x, bob.y)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  origin.x = width/2
}
