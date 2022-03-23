import { clamp, random } from "../utils.js"

export class Arm extends p5.Vector {
  constructor({ parent, length, x, y, gravity, velocity_to_clamp }) {
    super(x, y)
    this.parent = parent
    this.child = null
    this.length = length
    this.length_f = random(1, 3)

    this.angle = PI * (random() - 0.5) * 2
    this.x = this.parent.x + sin(this.angle) * this.length
    this.y = this.parent.y + cos(this.angle) * this.length

    this.g = gravity
    this.vtc = velocity_to_clamp
    this.mass = random() * this.g * 5000
    this.vel = 0
    this.acc = 0
    // if parent !== anchor of handulumie
    this.getAcc = this.parent.length ? this.getChildAcc : this.getParentAcc
  }

  getParentAcc() {
    const num1 = (2 * this.mass + this.child.mass) * sin(this.angle)
    const num2 = this.child.mass * sin(this.angle - 2 * this.child.angle)
    const num3 = 2 * this.child.mass * sin(this.angle - this.child.angle)
    const num4 = (this.child.vel ** 2) * this.child.length + (this.vel ** 2) * this.length * cos(this.angle - this.child.angle)
    const num5 = this.length * (2 * this.mass + this.child.mass - this.child.mass * cos(2 * this.angle - 2 * this.child.angle))
    const result = (-this.g * num1 - this.g * num2 - num3 * num4) / num5
    return result
  }

  getChildAcc() {
    const num1 = 2 * sin(this.parent.angle - this.angle)
    const num2 = (this.parent.vel ** 2) * this.parent.length * (this.parent.mass + this.mass)
    const num3 = (this.parent.mass + this.mass) * cos(this.parent.angle)
    const num4 = (this.vel ** 2) * this.length * this.mass * cos(this.parent.angle - this.angle)
    const num5 = this.length * (2 * this.parent.mass + this.mass - this.mass * cos(2 * this.parent.angle - 2 * this.angle))
    const result = (num1 * (num2 + this.g * num3 + num4)) / num5
    return result
  }

  update() {
    !this.child && (this.length += sin(frameCount * 0.05) * this.length_f)
    this.acc = this.getAcc()
    this.vel += this.acc
    this.vel = clamp(this.vel, -this.vtc, this.vtc)
    this.angle += this.vel
    this.x = this.parent.x + sin(this.angle) * this.length
    this.y = this.parent.y + cos(this.angle) * this.length
  }

  draw() {
    fill(191)
    noStroke()
    circle(this.x, this.y, this.mass/3)
    strokeCap(ROUND)
    strokeWeight(this.mass/3 + 4)
    stroke("#fff3")
    line(this.parent.x, this.parent.y, this.x, this.y)
  }
}