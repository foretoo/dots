import { Arm } from "./arm.js"
import { Arm_sim } from "./arm-sim.js"

export class Hand {
  constructor(num, anchor, g, v) {
    this.arms = []
    for ( let i = 0; i < num; i++ ) {
      this.arms.push(new Arm_sim({
        length: height / ((Math.random() + 1.25) * num),
        parent: i ? this.arms[i - 1] : anchor,
        angle: Math.PI * (Math.random() - 0.5) * 2,
        // g,
        // v,
      }))
      i && (this.arms[i - 1].child = this.arms[i])
    }
  }

  get anchor() {
    return point = this.arms[0].parent
  }

  get point() {
    const { x, y } = this.arms[this.arms.length - 1]
    return { x, y }
  }

  update() {
    this.arms.forEach(arm => arm.update())
  }

  draw() {
    this.arms.forEach(arm => arm.draw())
  }
}