import { random } from "../utils.js"

export class Arm_sim extends p5.Vector {
  constructor({ parent, child, length, angle, x, y }) {
    super(x, y)
    this.parent = parent || null
    this.child = child || null
    this.length = length
    this.angle = angle
    this.x = this.parent.x + sin(angle) * length
    this.y = this.parent.y + cos(angle) * length
    this.angle_f = random(0.005, 0.015) * (random(-1, 1) > 0 ? 1 : -1)
    this.angle_f_f = random(0, Math.PI)
  }

  update() {
    this.angle += this.angle_f * sin(this.angle_f_f + frameCount * 0.003)
    this.x = this.parent.x + sin(this.angle) * this.length
    this.y = this.parent.y + cos(this.angle) * this.length
  }

  draw() {
    fill(255)
    noStroke()
    circle(this.x, this.y, 12)
    !this.parent.length && circle(this.parent.x, this.parent.y, 12)
    strokeCap(ROUND)
    strokeWeight(24)
    stroke("#fff3")
    line(this.parent.x, this.parent.y, this.x, this.y)
    noFill()
  }
}