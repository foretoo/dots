import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
import getGUI from "../gui.js"
import { Hand } from "../assets/hand.js"
import { clamp, random, assign_obj, isFocused } from "../utils.js"

let ctx,
    hands = [],
    arm_num = 4,

    bg = "#eee",
    max_weight = 512,
    min_weight = 128,
    line_length = 16



const init_hands = (hand_num) => {
  const hands = []
  const delta_y = height / (hand_num * 1.5)
  const delta_x = width > height ? (width - height) / (hand_num * 1.5) : 0
  const delta_w = Math.sqrt(width * height) / 1000
  for (let i = 0; i < hand_num; i++) {
    hands.push({

      hand: new Hand({
        isSim: true,
        num: arm_num,
        anchor: {
          x: width / 2 + (i % 2 == 0 ? i : -i) * delta_x,
          y: i * delta_y
        },
      }),
      points: [],
      color: {
        h: random(180, 360),
        s: random(30, 90),
        b: random(30, 90),
      },
      weight: random(min_weight, max_weight) * delta_w,

    })
  }
  return hands
}



////////-- SETUP --////////
window.setup = function() {
  const p5Canvas = createCanvas(windowWidth, windowHeight)
  p5Canvas.style("filter", "url('#goo')")
  noFill()
  strokeJoin(ROUND)
  colorMode(HSB)

  ctx = drawingContext
  const clip = ctx.arc(width / 2, height / 2, min(width, height) / 2, 0, 2 * PI)
  ctx.clip(clip)

  hands = init_hands(parseInt(gui.handnum.value))
}
window.windowResized = function() {
  resizeCanvas(windowWidth, windowHeight);
}



////////-- DRAW --////////
window.draw = function() {
  gui.stats.begin()
  ctx.clearRect(0, 0, width, height)

  const shift = sin(frameCount * 0.002)
  hands.forEach(({ hand, points, color, weight }, i) => {
    assign_obj(hand.point, points, line_length)
    strokeWeight(weight)
    const sign = i % 2 == 0 ? 1 : -1
    const hue = (color.h + shift * sign * 90) % 360
    stroke(hue, color.s, color.b)
    beginShape()
    points.forEach(point => vertex(point.x, point.y))
    endShape()

    hand.update()
  })

  // if (handdraw.checked) hands.forEach(({ hand }) => hand.draw())
  gui.stats.end()
}



////////-- ADDITIONS --////////
const gui = getGUI(
  { type: "stats" },
  { type: "button", name: "reset" },
  { type: "button", name: "play" },
  { type: "number", name: "handnum", min: 0, value: 9 }
)
const toggle_play = () => {
  if (isLooping()) {
    gui.play.textContent = "play"
    noLoop()
  }
  else {
    gui.play.textContent = "stop"
    loop()
  }
}
const handle_reset = () => {
  hands = init_hands(parseInt(gui.handnum.value))
  drawingContext.clearRect(0, 0, width, height);
  if (!isLooping()) {
    gui.play.textContent = "stop"
    loop()
  }
}
// gui.handdraw.onchange = () => {
//   if (handdraw.checked) handdraw.removeAttribute("checked")
//   else handdraw.setAttribute("checked", null)
// }
gui.handnum.oninput = () => {
  handnum.value = clamp(parseInt(handnum.value), 1, 48)
  handle_reset()
}
gui.reset.onclick = handle_reset
gui.play.onclick = toggle_play
document.onkeyup = ({ code }) => {
  if (code === "Space" && !isFocused(gui.reset, gui.play)) toggle_play()
  if (code === "Enter" && !isFocused(gui.reset, gui.play)) handle_reset()
}