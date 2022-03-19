import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
import { Hand } from "./hand.js"
import { redraw, play, num, handdraw } from "./gui.js"

let hands = [],
    arm_num = 5,
    is_hand_display = false,

    g = 0.0618,

    trace = null,
    max_line_weight = 96,
    min_line_weight = 8,
    line_length = 64



const init_hands = (hands_num) => {
  const hands = []
  const delta_y = (height / (hands_num + (hands_num / 2) | 0)) | 0
  for (let i = 0; i < hands_num; i++) {
    hands.push({
      hand: new Hand(arm_num, g, i * delta_y),
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
  hands = init_hands(parseInt(num.value))
}



////////-- DRAW --////////
window.draw = function() {
  trace.background(0)
  hands.forEach(({ hand, draw_arr, color, weight }, i) => {
    draw_arr.unshift(hand.point)
    if (draw_arr.length > line_length) draw_arr.pop()

    if (draw_arr.length > 1) {
      trace.stroke(color)
      trace.strokeWeight(weight)
      draw_arr.forEach((point, i) => {
        if (i) trace.line(point.x, point.y, draw_arr[i-1].x, draw_arr[i-1].y)
      })
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