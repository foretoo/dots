export const clamp = (value, min, max) => (
  value < min ? min : value > max ? max : value
)

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

export const assign = (value, arr, length) => {
  const isObj = isObject(value)
  if (arr.length < length) arr.push(value)
  else {
    for (let i = 0; i < arr.length - 1; i++) {
      if (isObj)
        for (let k in arr[i])
          arr[i][k] = arr[i + 1][k]
      else
        arr[i] = arr[i + 1]
    }
    arr[length - 1] = value
  }
}