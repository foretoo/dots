import "../lib/p5.min.js"
import { Arm } from "./arm.js"
import { arm_num, line_width } from "./const.js"
import { button, checkbox, range } from "./gui.js"

let hand,
    is_hand_display = false,
    trace,
    trace_vel = 1

function init_hand(num) {
  const hand = []
  let handLength = 0
  for ( let i = 0; i < num; i++ ) {
    if (i === 0) hand.push(new Arm({ parent: { x: width/2, y: 0 }}))
    else {
      hand.push(new Arm({ parent: hand[i-1] }))
      hand[i-1].child = hand[i]
    }
    handLength += hand[i].length
  }
  hand[0].parent.y = (height - handLength) / 2
  return hand
}



////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  trace = createGraphics(width, height)
  trace.background(0)
  trace.stroke(255)
  trace.strokeWeight(line_width)
  hand = init_hand(arm_num)
}



////////-- DRAW --////////
window.draw = function() {
  const { x, y } = hand.at(-1)
  hand.forEach(hand => hand.update())

  if (frameCount > 32) trace.line(hand.at(-1).x, hand.at(-1).y, x, y - trace_vel)
  trace.image(trace, 0, 0, width, height, 0, trace_vel, width, height)
  image(trace, 0, 0)
  if (is_hand_display) for (let arm of hand) arm.draw()
}



////////-- ADDITIONS --////////
window.windowResized = function() {
  resizeCanvas(windowWidth, windowHeight)
  trace.width = windowWidth
  trace.height = windowHeight
  hand[0].parent.x = width / 2
}
range.oninput = (e) => {
  trace_vel = e.target.value
}
checkbox.onchange = () => {
  is_hand_display = !is_hand_display
  if (is_hand_display) checkbox.setAttribute("checked", null)
  else checkbox.removeAttribute("checked")
}
button.onclick = () => {
  frameCount = 0
  hand = init_hand(arm_num)
  trace.background(0)
  loop()
}