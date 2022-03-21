import "../lib/p5.min.js"
import { Hand } from "./hand.js"
import { getGUI } from "./gui.js"

let hand = null,
    arm_num = 5,
    is_hand_display = false,

    g = 0.02,

    trace = null,
    trace_vel = 1,
    line_width = 32



////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  trace = createGraphics(width, height)
  trace.background(0)
  trace.stroke(255)
  trace.strokeWeight(line_width)
  hand = new Hand(arm_num, height / arm_num, g, 0.04)
}



////////-- DRAW --////////
window.draw = function() {
  const prev = hand.point
  hand.update()
  const cur = hand.point
  trace.line(cur.x, cur.y, prev.x, prev.y - trace_vel)
  trace.image(trace, 0, 0, width, height, 0, trace_vel, width, height)
  image(trace, 0, 0)
  if (is_hand_display) hand.draw()
}



////////-- ADDITIONS --////////
const { reset, play, handdraw, range } = getGUI("reset", "play", "handdraw", "range")
range.oninput = () => {
  trace_vel = range.value
}
handdraw.onchange = () => {
  is_hand_display = !is_hand_display
  if (is_hand_display) handdraw.setAttribute("checked", null)
  else handdraw.removeAttribute("checked")
}
reset.onclick = () => {
  hand = new Hand(arm_num, height / arm_num, g, 0.04)
  trace.background(0)
}
play.onclick = () => {
  if (isLooping()) {
    play.textContent = "play"
    noLoop()
  }
  else {
    play.textContent = "stop"
    loop()
  }
}