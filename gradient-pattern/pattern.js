import { newarr, getcanvas, random } from "../utils.js"
import { get_noise } from "../assets/noise.js"

const { pow } = Math,
      { ctx, width, height } = getcanvas()

const gradients_num = 3,
      layers_num = 3,
      colors_num = height / 16 | 0,
      gradient_width = width / gradients_num + 1 | 0,
      gradients =
        newarr(gradients_num, () =>
          newarr(layers_num, (_, i) =>
            newarr(colors_num / pow(i + 1, 2) | 0, () => random())
          ).reverse()
        ),
      vel = 1



const background = (color = "black") => {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)
}



let frame = 0
const loop = () => {
  background("#019")

  gradients.forEach((gradient, i) => {
    const x = i * gradient_width

    gradient.forEach((layer, j) => {
      const img = ctx.createLinearGradient(0, 0, 0, height)

      layer.forEach((y) => {
        const value = get_noise(
                frame * layer.length * vel / 10000,
                (y + i) * height
              ),
              r = 255,
              g = value * 159 | 0,
              b = value * 31  | 0,
              a = pow(value, 1 + j * 6)

        img.addColorStop(y, `rgba(${r},${g},${b},${a})`)
      })

      ctx.fillStyle = img
      ctx.fillRect(x, 0, gradient_width, height)
    })
  })

  frame++
  requestAnimationFrame(loop)
}
loop()