import "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.1/p5.min.js"
import getGUI from "../gui/gui.js"
import { Hand } from "../assets/hand.js"
import { getpeacepath } from "../assets/peacepath.js"
import { random, isFocused } from "../utils.js"

let p5Canvas,
    ctx

const feGaussianBlur = document.querySelector("feGaussianBlur"),
      stdDeviation   = feGaussianBlur.getAttribute("stdDeviation"),

      hands = [],
      arm_num = 4,
      hand_num = 32,

      max_weight = 320,
      min_weight = 64



const init_hands = () => {
  const delta_y = height / hand_num
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
      color: {
        h: random(0, 360),
        s: random(0, 75),
        b: 100,
      },
      weight: random(min_weight, max_weight) * delta_w,

    })
  }
}



////////-- SETUP --////////
window.setup = function() {
  p5Canvas = createCanvas(windowWidth, windowHeight)
  p5Canvas.style("filter", "url('#liquid')")
  ctx = drawingContext
  ctx.clip(new Path2D(getpeacepath(width, height)), "evenodd")
  feGaussianBlur.setAttribute("stdDeviation", stdDeviation * Math.min(width, height) / 1000)

  noStroke()
  colorMode(HSB)

  init_hands()
}



////////-- DRAW --////////
window.draw = function() {
  // gui.stats.begin()
  ctx.clearRect(0, 0, width, height)

  const shift = sin(frameCount * 0.002)
  hands.forEach(({ hand, color, weight }, i) => {
    const sign = i % 2 == 0 ? 1 : -1
    const hue = (color.h + shift * sign * 60) % 360
    fill(hue, color.s, color.b)
    circle(hand.point.x, hand.point.y, weight)

    hand.update()
  })

  // if (gui.handdraw.checked) hands.forEach(({ hand }) => hand.draw())
  // gui.stats.end()
}



////////-- ADDITIONS --////////
const gui = getGUI(
  // { type: "stats" },
  { type: "button", name: "reset" },
  { type: "button", name: "play" },
  // { type: "number", name: "handnum", min: 0, value: 32 },
)
gui.play.textContent = "stop"
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
  p5Canvas.remove()
  p5Canvas = createCanvas(windowWidth, windowHeight)
  p5Canvas.style("filter", "url('#liquid')")
  ctx.clip(new Path2D(getpeacepath(width, height)), "evenodd")
  feGaussianBlur.setAttribute("stdDeviation", stdDeviation * Math.min(width, height) / 1000)

  hands.length = 0
  init_hands()
  if (!isLooping()) {
    gui.play.textContent = "stop"
    loop()
  }
}
// gui.handdraw.onchange = () => {
//   if (handdraw.checked) handdraw.removeAttribute("checked")
//   else handdraw.setAttribute("checked", null)
// }
// gui.handnum.oninput = () => {
//   gui.handnum.value = clamp(parseInt(gui.handnum.value), 1, 48)
//   handle_reset()
// }
gui.reset.onclick = handle_reset
gui.play.onclick = toggle_play
document.onkeyup = ({ code }) => {
  if (code === "Space" && !isFocused(gui.reset, gui.play)) toggle_play()
  if (code === "Enter" && !isFocused(gui.reset, gui.play)) handle_reset()
}

window.windowResized = handle_reset