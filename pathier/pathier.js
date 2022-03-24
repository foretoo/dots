import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
import getGUI from "../gui/gui.js"
import { Hand } from "../assets/hand.js"

let hand = null,
    arm_num = 5,
    is_hand_display = false,

    g = 0.01,

    trace = null,
    trace_vel = 1,
    line_width = 32



////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  trace = createGraphics(width, height)
  trace.background(0)
  trace.strokeWeight(line_width)
  hand = new Hand({
    num: arm_num,
    anchor: {x: width / 2, y: height / arm_num },
    gravity: g,
    velocity_to_clamp: 0.02,
  })
}



////////-- DRAW --////////
window.draw = function() {
  const prev = hand.point
  hand.update()
  const cur = hand.point
  trace.stroke(255)
  trace.line(cur.x, cur.y, prev.x, prev.y - trace_vel)
  trace.image(trace, 0, 0, width, height, 0, trace_vel, width, height)

  trace.noStroke()
  trace.fill("black")
  trace.rect(0, 0, width, Math.abs(trace_vel))
  trace.rect(0, height - Math.abs(trace_vel), width, Math.abs(trace_vel))

  image(trace, 0, 0)
  if (is_hand_display) hand.draw()
}



////////-- ADDITIONS --////////
const gui = getGUI(
  { type: "button", name: "reset" },
  { type: "button", name: "play" },
  { type: "checkbox", name: "handdraw" },
  { type: "range", name: "velocity", min: -5, max: 5, value: trace_vel },
)
gui.play.textContent = "stop"
gui.velocity.oninput = () => {
  trace_vel = gui.velocity.value
}
gui.handdraw.onchange = () => {
  is_hand_display = !is_hand_display
  if (is_hand_display) gui.handdraw.setAttribute("checked", null)
  else gui.handdraw.removeAttribute("checked")
}
gui.reset.onclick = () => {
  hand = new Hand({
    num: arm_num,
    anchor: {x: width / 2, y: height / arm_num },
    gravity: g,
    velocity_to_clamp: 0.02,
  })
  trace.background(0)
  if (!isLooping()) {
    gui.play.textContent = "stop"
    loop()
  }
}
gui.play.onclick = () => {
  if (isLooping()) {
    gui.play.textContent = "play"
    noLoop()
  }
  else {
    gui.play.textContent = "stop"
    loop()
  }
}