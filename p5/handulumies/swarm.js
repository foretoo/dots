import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
import { Hand } from "./hand.js"
import { getGUI } from "./gui.js"
import { clamp, random, random_hex, assign } from "../utils.js"

let hands = [],
    arm_num = 4,
    // is_hand_display = false,

    g = 0.006,

    bg = "#eee",
    max_weight = 128,
    min_weight = 8,
    line_length = 128
    // noise_offset = 0.000



const init_hands = (hands_num) => {
  const hands = []
  const delta_y = height / (hands_num * 1.5) | 0
  for (let i = 0; i < hands_num; i++) {
    hands.push({

      hand: new Hand(arm_num, i * delta_y, g, random(0.02, 0.05)),
      points: [],
      color: {
        hex: "#" + random_hex(3),
        // h: random(0, 360)  | 0,
        // s: random(25, 100) | 0,
        // b: random(25, 100) | 0,
        // hues: [],
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
  strokeJoin(ROUND)
  // colorMode(HSB)
  hands = init_hands(parseInt(handnum.value))
}



////////-- DRAW --////////
window.draw = function() {
  noFill()
  strokeCap(PROJECT)
  background(bg)

  // const shift = noise(noise_offset)
  hands.forEach(({ hand, points, color, weight }) => {
    assign(hand.point, points, line_length)
    strokeWeight(weight)
    // const hue = (color.h + shift * 360 | 0) % 360
    // assign(hue, color.hues, line_length)
    // for (let i = 0; i < points.length - 1; i++) {
    //   stroke(color.hues[i], color.s, color.b)
    //   line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
    // }
    stroke(color.hex)
    beginShape()
    points.forEach(point => vertex(point.x, point.y))
    endShape()
    hand.update()
  })
  // noise_offset += 0.003

  // if (is_hand_display) hands.forEach(({ hand }) => hand.draw())
}



////////-- ADDITIONS --////////
const { reset, play, handnum } = getGUI("reset", "play", "handnum")
const toggle_play = () => {
  if (isLooping()) {
    play.textContent = "play"
    noLoop()
  }
  else {
    play.textContent = "stop"
    loop()
  }
}
const handle_reset = () => {
  hands = init_hands(parseInt(handnum.value))
  background(bg)
  if (!isLooping()) {
    play.textContent = "stop"
    loop()
  }
}
// handdraw.onchange = () => {
//   is_hand_display = !is_hand_display
//   if (is_hand_display) handdraw.setAttribute("checked", null)
//   else handdraw.removeAttribute("checked")
// }
handnum.oninput = () => {
  handnum.value = clamp(parseInt(handnum.value), 1, 48)
  handle_reset()
}
reset.onclick = handle_reset
play.onclick = toggle_play
document.addEventListener("keyup", (e) => {
  e.preventDefault()
  e.code === "Space" && toggle_play()
  e.code === "Enter" && handle_reset()
})