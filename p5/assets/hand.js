import { Arm } from "./arm.js"
import { Arm_sim } from "./arm-sim.js"

export class Hand {
  constructor({ isSim, num, anchor, gravity, velocity_to_clamp }) {
    this.arms = []
    const arm = isSim ? Arm_sim : Arm
    for ( let i = 0; i < num; i++ ) {
      this.arms.push(new arm({
        length: height / ((Math.random() + 1.25) * num),
        parent: i ? this.arms[i - 1] : anchor,
        angle: Math.PI * (Math.random() - 0.5) * 2,
        gravity,
        velocity_to_clamp,
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