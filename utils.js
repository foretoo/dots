export const clamp = (value, min, max) => (
  value < min ? min : value > max ? max : value
)

const polynomify = (value) => value * value * (3 - 2 * value)
export const smoothstep = (value, min, max) => (
  polynomify(clamp((value - min) / (max - min), 0, 1))
)

export const get1DNoise = (x) => ((
  ( Math.sin( 4.1 * x) + Math.sin(Math.PI * x) ) / 2 +
  ( Math.sin(-1.1 * x) + Math.sin(Math.E  * x) ) / 2
) / 2)

const hex_digits = "0123456789abcdef"
export const random_hex = (n) => {
  let result = ""
  for (let i = 0; i < n; i++) {
    result += hex_digits[Math.random() * 16 | 0]
  }
  return result
}

export const random = (min, max) => (
  min + Math.random() * (max - min)
)

export const isFocused = (...elements) => (
  elements.some(element => document.activeElement === element)
)

export const isObject = (obj) => (
  Object.prototype.toString.call(obj) === "[object Object]"
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