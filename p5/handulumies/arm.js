import { clamp } from "../utils.js"

export class Arm extends p5.Vector {
  constructor({ parent, child, length, mass, angle, x, y, g, v }) {
    super(x, y)
    this.g = g
    this.v = v
    this.parent = parent || null
    this.child = child || null
    this.length = length
    this.mass = mass || Math.random() * g * 5000
    this.angle = angle || Math.PI * (Math.random() - 0.5) * 2
    this.x = this.parent.x + sin(this.angle) * this.length
    this.y = this.parent.y + cos(this.angle) * this.length
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
    this.acc = this.getAcc()
    this.vel += this.acc
    this.vel = clamp(this.vel, -this.v, this.v)
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