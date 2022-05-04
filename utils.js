export const clamp = (value, min, max) => (
  value < min ? min : value > max ? max : value
)

export const clampthru = (value, min, max) => (
  value < min
  ? max - (min - value) % (max - min)
  : value > max
    ? (value - max) % (max - min) + min
    : value
)



const polynomify = (value) => value * value * (3 - 2 * value)
export const smoothstep = (value, min, max) => (
  polynomify(clamp((value - min) / (max - min), 0, 1))
)



export const get1DNoise = (x) => (
  ( Math.sin( 4.1    * x) +
    Math.sin(-1.1    * x) +
    Math.sin(Math.PI * x) +
    Math.sin(Math.E  * x) ) + 4 ) / 8

export const random = (a, b) => {
  if (Array.isArray(a))
    return a[Math.random() * a.length | 0]
  else if (!a && !b)
    return Math.random()
  else if (a && !b)
    return Math.random() * a
  else
    return a + Math.random() * (b - a)
}



export const isFocused = (...elements) => (
  elements.some(element => document.activeElement === element)
)

export const isObject = (obj) => (
  Object.prototype.toString.call(obj) === "[object Object]"
)

export const isFunc = (fn) => (
  Object.prototype.toString.call(fn) === "[object Function]"
)

export const get_type = (value) => (
  Object.prototype.toString
    .call(value)
    .match(/[A-Z][a-z]+/g)[0]
    .toLowerCase()
)



export const assign_val = (value, arr, length) => {
  if (arr.length < length) arr.push(value)
  else {
    for (let i = 0; i < arr.length - 1; i++) {
      arr[i] = arr[i + 1]
    }
    arr[length - 1] = value
  }
}
export const assign_obj = (obj, arr, length) => {
  if (arr.length < length) arr.push(obj)
  else {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let k in arr[i])
        arr[i][k] = arr[i + 1][k]
    }
    arr[length - 1] = obj
  }
}



export const newarr = (length, mapper) => {
  if (get_type(mapper) === "function")
    return Array(length).fill().map(mapper)
  else
    return Array(length).fill(mapper)
}



export const getcanvas = (w, h) => {
  let width = w,
      height = h

  const canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d")

  document.body.prepend(canvas)
  canvas.setAttribute("id", "canvas")
  if (width) {
    if (!height) height = width
    canvas.setAttribute("style", `width:${width}px;height:${height}px;`)
    canvas.setAttribute("width", width)
    canvas.setAttribute("height", height)
  }
  else {
    canvas.setAttribute("style", "width:100%;height:100%;")
    const rect = canvas.getBoundingClientRect()
    width = rect.width
    height = rect.height
    canvas.setAttribute("width", width)
    canvas.setAttribute("height", height)
  }

  return { canvas, ctx, width, height }
}