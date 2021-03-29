let origin,
    bob,
    arm,
    angle = Math.PI / 4,
    aVel = 0.0,
    aAcc = 0.0

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  origin = new p5.Vector(width/2, 0)
  bob = new p5.Vector(origin.x, arm)
  arm = height / 2
}

function draw() {
  aAcc = (-0.75 / arm) * sin(angle)
  aVel += aAcc
  aVel *= 0.997
  angle += aVel

  bob.x = origin.x + sin(angle) * arm
  bob.y = origin.y + cos(angle) * arm

  background(0)
  fill(191)
  circle(bob.x, bob.y, 20)
  stroke(191)
  line(origin.x, origin.y, bob.x, bob.y)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  origin = p5.Vector(width/2, 0)
  bob = p5.Vector(origin.x, arm)
}
