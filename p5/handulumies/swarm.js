import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
import { Hand } from "./hand.js"
import { redraw, play, num, handdraw } from "./gui.js"

let hands = [],
    arm_num = 5,
    is_hand_display = false,

    g = 0.006,

    trace = null,
    max_line_weight = 128,
    min_line_weight = 8,
    line_length = 128



const init_hands = (hands_num) => {
  const hands = []
  const delta_y = (height / (hands_num + (hands_num / 2) | 0)) | 0
  for (let i = 0; i < hands_num; i++) {
    hands.push({
      hand: new Hand(arm_num, i * delta_y, g, 0.02 + Math.random() * 0.03),
      draw_arr: [],
      color: "#" + Array(3).fill().map(() => (Math.random() * 16 | 0).toString(16)).join(""),
      weight: min_line_weight + Math.random() * (max_line_weight - min_line_weight) | 0,
    })
  }
  return hands
}



////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  background(0)
  trace = createGraphics(width, height)
  trace.background(0)
  trace.noFill()
  hands = init_hands(parseInt(num.value))
}



////////-- DRAW --////////
window.draw = function() {
  trace.background(0)
  hands.forEach(({ hand, draw_arr, color, weight }) => {
    draw_arr.unshift(hand.point)
    if (draw_arr.length > line_length) draw_arr.pop()

    if (draw_arr.length > 1) {
      trace.stroke(color)
      trace.strokeWeight(weight)
      trace.beginShape();
      draw_arr.forEach(point => trace.vertex(point.x, point.y))
      trace.endShape();
      image(trace, 0, 0)
    }
    hand.update()
  })
  if (is_hand_display) hands.forEach(({ hand }) => hand.draw())
}



////////-- ADDITIONS --////////
handdraw.onchange = () => {
  is_hand_display = !is_hand_display
  if (is_hand_display) handdraw.setAttribute("checked", null)
  else handdraw.removeAttribute("checked")
}
num.oninput = () => {
  hands = init_hands(parseInt(num.value))
  trace.background(0)
}
redraw.onclick = () => {
  hands = init_hands(parseInt(num.value))
  trace.background(0)
}
play.onclick = () => {
  if (window.isLooping()) {
    play.textContent = "play"
    window.noLoop()
  }
  else {
    play.textContent = "stop"
    window.loop()
  }
}