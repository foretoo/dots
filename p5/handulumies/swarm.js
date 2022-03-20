import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
import { Hand } from "./hand.js"
import { redraw, play, num, handdraw } from "./gui.js"
import { clamp, random, random_hex } from "../utils.js"

let hands = [],
    arm_num = 4,
    is_hand_display = false,

    g = 0.006,

    bg = "#eee",
    max_weight = 128,
    min_weight = 8,
    line_length = 128



const init_hands = (hands_num) => {
  const hands = []
  const delta_y = height / (hands_num + hands_num / 2) | 0
  for (let i = 0; i < hands_num; i++) {
    hands.push({

      hand: new Hand(arm_num, i * delta_y, g, random(0.02, 0.05)),
      points: [],
      color: "#" + random_hex(3),
      weight: random(min_weight, max_weight) | 0,

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
  noFill()
  strokeCap(PROJECT)
  strokeJoin(ROUND)
  hands = init_hands(parseInt(num.value))
}



////////-- DRAW --////////
window.draw = function() {
  noFill()
  strokeCap(PROJECT)
  strokeJoin(ROUND)
  background(bg)

  hands.forEach(({ hand, points, color, weight, assign }) => {
    assign(hand.point)

    stroke(color)
    strokeWeight(weight)
    beginShape()
    points.forEach(point => vertex(point.x, point.y))
    endShape()

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
  num.value = clamp(num.value, 1, 48)
  hands = init_hands(parseInt(num.value))
  background(0)
}
redraw.onclick = () => {
  hands = init_hands(parseInt(num.value))
  background(0)
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