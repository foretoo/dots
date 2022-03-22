export class Arm_sim extends p5.Vector {
  constructor({ parent, child, length, angle, x, y }) {
    super(x, y)
    this.parent = parent || null
    this.child = child || null
    this.length = length
    this.angle = angle
    this.x = this.parent.x + sin(this.angle) * this.length
    this.y = this.parent.y + cos(this.angle) * this.length
    this.angle_f = (Math.random() - 0.5) * 0.03
  }

  update() {
    this.angle += this.angle_f
    this.x = this.parent.x + sin(this.angle) * this.length
    this.y = this.parent.y + cos(this.angle) * this.length
  }

  draw() {
    fill(255)
    noStroke()
    circle(this.x, this.y, 12)
    strokeCap(ROUND)
    strokeWeight(24)
    stroke("#fff3")
    line(this.parent.x, this.parent.y, this.x, this.y)
  }
}