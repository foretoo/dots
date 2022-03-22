import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
import { Hand } from "./hand.js"
import { getGUI, stats } from "./gui.js"
import { clamp, random, random_hex, assign_obj, assign_val, isFocused } from "../utils.js"

let hands = [],
    arm_num = 4,

    g = 0.006,

    bg = "#eee",
    max_weight = 256,
    min_weight = 64,
    line_length = 128



const init_hands = (hands_num) => {
  const hands = []
  const delta_y = height / (hands_num * 1.5)
  const delta_x = width > height ? (width - height) / (hands_num * 1.5) : 0
  const delta_w = Math.sqrt(width * height) / 1000
  for (let i = 0; i < hands_num; i++) {
    hands.push({

      hand: new Hand(
        arm_num,
        {
          x: width / 2 + (i % 2 == 0 ? i : -i) * delta_x,
          y: i * delta_y
        },
        g,
        random(0.02, 0.05),
      ),
      points: [],
      color: {
        hex: "#" + random_hex(3),
        h: random(0, 360),
        s: random(20, 100),
        b: random(20, 100),
        // hues: [],
      },
      weight: random(min_weight, max_weight) * delta_w,

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
  colorMode(HSB)

  hands = init_hands(parseInt(handnum.value))
}
window.windowResized = function() {
  resizeCanvas(windowWidth, windowHeight);
}



////////-- DRAW --////////
window.draw = function() {
  stats.begin()
  background(bg)

  const shift = sin(frameCount * 0.001)
  hands.forEach(({ hand, points, color, weight }, i) => {
    strokeWeight(weight)
    assign_obj(hand.point, points, line_length)

    const sign = i % 2 == 0 ? 1 : -1
    const hue = (color.h + shift * sign * 180) % 360
    // assign_val(hue, color.hues, line_length)
    // for (let i = 0; i < points.length - 1; i++) {
    //   stroke(color.hues[i], color.s, color.b)
    //   line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
    // }

    stroke(hue, color.s, color.b)
    beginShape()
    points.forEach(point => vertex(point.x, point.y))
    endShape()

    hand.update()
  })

  // if (handdraw.checked) hands.forEach(({ hand }) => hand.draw())
  stats.end()
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
//   if (handdraw.checked) handdraw.removeAttribute("checked")
//   else handdraw.setAttribute("checked", null)
// }
handnum.oninput = () => {
  handnum.value = clamp(parseInt(handnum.value), 1, 48)
  handle_reset()
}
reset.onclick = handle_reset
play.onclick = toggle_play
document.onkeyup = ({ code }) => {
  if (code === "Space" && !isFocused(reset, play)) toggle_play()
  if (code === "Enter" && !isFocused(reset, play)) handle_reset()
}