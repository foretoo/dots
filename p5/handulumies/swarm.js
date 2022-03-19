import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
import { Hand } from "./hand.js"
import { redraw, play, num, handdraw } from "./gui.js"

let hands = [],
    arm_num = 4,
    is_hand_display = false,

    g = 0.006,

    trace = null,
    bg = "#111",
    max_line_weight = 128,
    min_line_weight = 8,
    line_length = 128



const init_hands = (hands_num) => {
  const hands = []
  const delta_y = (height / (hands_num + (hands_num / 2) | 0)) | 0
  for (let i = 0; i < hands_num; i++) {
    hands.push({
      hand: new Hand(arm_num, i * delta_y, g, 0.02 + Math.random() * 0.03),
      points: [],
      color: "#" + Array(3).fill().map(() => (Math.random() * 16 | 0).toString(16)).join(""),
      weight: min_line_weight + Math.random() * (max_line_weight - min_line_weight) | 0,
      assign: ({ x, y }) => {
        const arr = hands[i].points
        if (arr.length < line_length) arr.push({ x, y })
        else {
          for (let i = 0; i < arr.length - 1; i++) {
            arr[i].x = arr[i + 1].x
            arr[i].y = arr[i + 1].y
          }
          arr[arr.length - 1] = { x, y }
        }
      },
    })
  }
  return hands
}



////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  background(bg)
  trace = createGraphics(width, height)
  trace.background(bg)
  trace.noFill()
  trace.strokeJoin(ROUND);
  hands = init_hands(parseInt(num.value))
}



////////-- DRAW --////////
window.draw = function() {
  trace.background(bg)
  hands.forEach(({ hand, points, color, weight, assign }) => {
    assign(hand.point)

    trace.stroke(color)
    trace.strokeWeight(weight)
    trace.beginShape();
    points.forEach(point => trace.vertex(point.x, point.y))
    trace.endShape();

    image(trace, 0, 0)
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