import { getcanvas, bg, stroke, fill, mask, clip, shape, CLOSE, vertex, arc, pxratio } from "https://unpkg.com/bratik@latest/dist/bratik.min.js"
import roundPolygon from "https://unpkg.com/round-polygon@latest/dist/round-polygon.es.js"

let poly

const { width, height, ctx, canvas } = getcanvas()
const dark = Math.round(Math.random())
const pr = pxratio()
bg(dark ? "#000" : "#fff")
// canvas.style.visibility = "hidden"
// canvas.height = 0



const displayCanvas = document.createElement("canvas")
document.body.prepend(displayCanvas)
// displayCanvas.style.height = "0px"
displayCanvas.width = width * pr
displayCanvas.height = height * pr
const disctx = displayCanvas.getContext("2d")

disctx.imageSmoothingEnabled = true;
disctx.strokeStyle = "transparent"
disctx.fillStyle = dark ? "#000" : "#fff"
disctx.fillRect(0, 0, width * pr, height * pr)

const getpoints = () =>
  Array(3+Math.random()*18|0).fill().map(() => ({
    x: Math.random() * width,
    y: Math.random() * height
  }))

const drawpoly = (off = 0) => {
  shape()
  vertex(poly[0].in.x - off/2, poly[0].in.y + off)
  poly.forEach((p) => arc(p.x - off/2, p.y + off, p.out.x - off/2, p.out.y + off, p.arc.radius))
  shape(CLOSE)
}

let i = 0
const smookie = (color) => {
  // bg(dark ? "#000" : "#fff")
  poly = roundPolygon(getpoints(), Number.MAX_SAFE_INTEGER)

  ctx.filter = `blur(20px)`
  ctx.globalCompositeOperation = "multiply"
  stroke(null)
  fill(color)
  drawpoly(10)
  disctx.drawImage(canvas, 0, 0)
  ctx.globalCompositeOperation = "source-over"
  // disctx.globalCompositeOperation = "none"
  // bg(dark ? "#000" : "#fff")
  
  mask()

  drawpoly()

  mask(CLOSE)
  
  ctx.filter = `blur(20px) contrast(200%) saturate(62%)`
  ctx.drawImage(displayCanvas, 0, 0)
  // ctx.filter = "none"
  // i && (ctx.globalCompositeOperation = "overlay") // cool
  // i && (ctx.globalCompositeOperation = "color-burn") // cool
  // i && (ctx.globalCompositeOperation = "hard-light") // cool // screen
  // i && Math.round(Math.random()) ? ctx.globalCompositeOperation = "lighter" : ctx.globalCompositeOperation = "source-over"

  stroke(null)
  fill(color)
  drawpoly()
  stroke(color, 32)
  fill(null)
  drawpoly()
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

const hex = "0123456789abcdef".split("")
const randcolor = () => Array(7).fill().map((_,i)=>i?hex[Math.floor(Math.random()*16)]:"#").join("").concat("77")

const poll = (num) => {
  let i = num
  while (i) {
    i--
    smookie(randcolor())
  }
}

poll(5+Math.random()*8|0)