import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
import { Hand } from "./hand.js"
import { redraw, play, num, handdraw } from "./gui.js"
import { clamp, random, random_hex, assign } from "../utils.js"

let hands = [],
    arm_num = 4,
    is_hand_display = false,

    g = 0.006,

    bg = "#eee",
    max_weight = 128,
    min_weight = 8,
    line_length = 128,
    noise_offset = 0.000



const init_hands = (hands_num) => {
  const hands = []
  const delta_y = height / (hands_num + hands_num / 2) | 0
  for (let i = 0; i < hands_num; i++) {
    hands.push({

      hand: new Hand(arm_num, i * delta_y, g, random(0.02, 0.05)),
      points: [],
      color: {
        hex: "#" + random_hex(3),
        h: random(0, 360)  | 0,
        s: random(25, 100) | 0,
        b: random(25, 100) | 0,
        hues: [],
      },
      weight: random(min_weight, max_weight) | 0,

    })
  }
  return hands
}



////////-- SETUP --////////
window.setup = function() {
  createCanvas(windowWidth, windowHeight)
  background(bg)
  noFill()
  colorMode(HSB)
  // strokeCap(PROJECT)
  // strokeJoin(ROUND)
  hands = init_hands(parseInt(num.value))
}



////////-- DRAW --////////
window.draw = function() {
  // noFill()
  // strokeCap(ROUND)
  // strokeJoin(ROUND)
  background(bg)

  const shift = noise(noise_offset)
  hands.forEach(({ hand, points, color, weight }) => {
    strokeWeight(weight)
    const hue = (color.h + shift * 360 | 0) % 360
    assign(hand.point, points, line_length)
    assign(hue, color.hues, line_length)
    for (let i = 0; i < points.length - 1; i++) {
      stroke(color.hues[i], color.s, color.b)
      line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
    }
    hand.update()
  })
  noise_offset += 0.003

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