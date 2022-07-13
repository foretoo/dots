import { getcanvas, bg, stroke, fill, mask, clip, shape, CLOSE, vertex, arc, pxratio } from "https://unpkg.com/bratik@latest/dist/bratik.min.js"
import roundPolygon from "https://unpkg.com/round-polygon@latest/dist/round-polygon.es.js"
import getGUI from "../gui/gui.js"

let poly
let dark = Math.random()*2|0

const width = window.innerWidth
const height = window.innerHeight
const side = Math.min(width, height)
const blur = side / 500 * 20 | 0

const { ctx, canvas } = getcanvas(side)
canvas.style.width = canvas.style.height = `${side}px`
const pr = pxratio()
ctx.filter = `blur(${blur}px) contrast(162%) saturate(62%)`
document.body.style.backgroundColor = dark ? "#000" : "#fff"
bg(dark ? "#000" : "#fff")

const displayCanvas = document.createElement("canvas")
document.body.prepend(displayCanvas)
displayCanvas.style.width = displayCanvas.style.height = `${side}px`
displayCanvas.width = side * pr
displayCanvas.height = side * pr
const disctx = displayCanvas.getContext("2d")

disctx.strokeStyle = "transparent"
disctx.fillStyle = dark ? "#000" : "#fff"
disctx.fillRect(0, 0, side * pr, side * pr)



const getpoints = () =>
  Array(3+Math.random()*16|0).fill().map(() => ({
    x: Math.random() * side,
    y: Math.random() * side
  }))

const drawpoly = (off = 0) => {
  shape()
  vertex(poly[0].in.x - off/2, poly[0].in.y + off)
  poly.forEach((p) => arc(p.x - off/2, p.y + off, p.out.x - off/2, p.out.y + off, p.arc.radius))
  shape(CLOSE)
}



let i = 0
const smookie = (color) => {
  poly = roundPolygon(getpoints(), Number.MAX_SAFE_INTEGER)
  
  mask()
  drawpoly()
  mask(CLOSE)

  ctx.drawImage(displayCanvas, 0, 0);
  (i && Math.random()*2|0)
    ? ctx.globalCompositeOperation = dark ? "screen" : "hard-light"// Math.random()*2|0 ? "screen" : "multiply"
    : ctx.globalCompositeOperation = "source-over"

  stroke(null)
  fill(color)
  drawpoly()
  fill(null)
  stroke(color, 16)
  drawpoly()
  stroke(color, 8)
  drawpoly()
  stroke(color, 4)
  drawpoly()
  
  clip()
  
  disctx.drawImage(canvas, 0, 0)
  i++
}



const fhx = "0123456789abcdef".split("")
// const chx = "3456789abc".split("")
const randcolor = () => {
  const color = "#"+Array(6).fill().map(()=>fhx[Math.random()*16|0]).join("")+"80"
  // console.log(color)
  return color
}
const poll = (num) => { while (num) num--, smookie(randcolor()) }



poll(8+Math.random()*14|0)



////////-- ADDITIONS --////////
const gui = getGUI(
  { type: "button", name: "reset" },
)
gui.reset.onclick = () => {
  dark = Math.random()*2|0
  document.body.style.backgroundColor = dark ? "#000" : "#fff"
  ctx.filter = `none`
  bg(dark ? "#000" : "#fff")
  disctx.strokeStyle = "transparent"
  disctx.fillStyle = dark ? "#000" : "#fff"
  disctx.fillRect(0, 0, side * pr, side * pr)
  ctx.filter = `blur(${blur}px) contrast(162%) saturate(62%)`
  poll(8+Math.random()*14|0)
}