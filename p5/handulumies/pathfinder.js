import "../lib/p5.min.js"
import { Hand } from "./hand.js"
import { hands_num, line_width } from "./const.js"
import { button, checkbox, range } from "./gui.js"

let hands,
    is_hands_display = false,
    trace,
    trace_vel = 1

function init_hands(num) {
  const hands = []
  let handsLength = 0
  for ( let i = 0; i < num; i++ ) {
    if (i === 0) hands.push(new Hand({ parent: { x: width/2, y: 0 }}))
    else {
      hands.push(new Hand({ parent: hands[i-1] }))
      hands[i-1].child = hands[i]
    }
    handsLength += hands[i].length
  }
  hands[0].parent.y = (height - handsLength) / 2
  return hands
}



////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  trace = createGraphics(width, height)
  trace.background(0)
  trace.stroke(255)
  trace.strokeWeight(line_width)
  hands = init_hands(hands_num)
}



////////-- DRAW --////////
window.draw = function() {
  const { x, y } = hands.at(-1)
  hands.forEach(hand => hand.update())
  if (is_hands_display) for (let hand of hands) hand.draw()

  if (frameCount > 32) trace.line(hands.at(-1).x, hands.at(-1).y, x, y - trace_vel)
  trace.image(trace, 0, 0, width, height, 0, trace_vel, width, height)
  image(trace, 0, 0)
}



////////-- ADDITIONS --////////
window.windowResized = function() {
  resizeCanvas(windowWidth, windowHeight)
  trace.width = windowWidth
  trace.height = windowHeight
  hands[0].parent.x = width / 2
}
range.oninput = (e) => {
  trace_vel = e.target.value
}
checkbox.onchange = () => {
  is_hands_display = !is_hands_display
  if (is_hands_display) checkbox.setAttribute("checked", null)
  else checkbox.removeAttribute("checked")
}
button.onclick = () => {
  frameCount = 0
  hands = init_hands(hands_num)
  trace.background(0)
  loop()
}