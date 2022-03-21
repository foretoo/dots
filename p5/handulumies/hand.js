import { Arm } from "./arm.js"

export class Hand {
  constructor(num, anchor, g, v) {
    this.arms = []
    this.arms_length = []
    this.hand_length = 0

    for ( let i = 0; i < num; i++ ) {
      const length = height / ((Math.random() + 1.25) * num)
      this.arms_length.push(length)
      this.hand_length += length
    }

    for ( let i = 0; i < num; i++ ) {
      if (i === 0)
        this.arms.push(new Arm({
          length: this.arms_length[i],
          parent: anchor,
          g,
          v,
        }))
      else {
        this.arms.push(new Arm({
          length: this.arms_length[i],
          parent: this.arms[i - 1],
          g,
          v,
        }))
        this.arms[i - 1].child = this.arms[i]
      }
    }
  }

  get anchor() {
    const point = this.arms[0].parent
    return {
      get x() { return point.x },
      get y() { return point.y },
      set x(value) { point.x = value },
      set y(value) { point.y = value },
    }
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