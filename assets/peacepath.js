export const getpeacepath = (width, height) => {
  const data = `
    M950 500c0 248.53-201.47 450-450 450s-450-201.47-450-450 201.47-450 450-450 450 201.47 450 450z
    m-510-324.56c-153.61 28.216-270 162.8-270 324.56 0 38.695 6.66 75.834 18.896 110.33l251.1-144.98v-289.92z
    m0 428.48-191.03 110.29c48.186 56.415 115.06 96.389 191.03 110.34v-220.64z
    m390-103.92c0 38.695-6.66 75.834-18.896 110.33l-251.1-144.98v-289.92c153.61 28.216 270 162.8 270 324.56z
    m-270 103.92 191.03 110.29c-48.186 56.414-115.06 96.388-191.03 110.34v-220.64z
  `
  const regfloat = /[0-9.]+/g
  const min = Math.min(width, height)
  const scale = f => parseFloat(f) * (min / 1000)

  return data.replace(regfloat, scale)
    .replace(/M[0-9. ]+/g, moveto => (
      moveto.replace(regfloat, (f, i) => (
        i === 1
          ? parseFloat(f) + (width - min)  / 2
          : parseFloat(f) + (height - min) / 2
      ))
    ))
}