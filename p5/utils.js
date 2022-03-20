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