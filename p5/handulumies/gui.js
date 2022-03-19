const controls = document.createElement('div')
controls.style.cssText = `
  position: absolute;
  padding: 20px;
  display: flex;
  align-items: baseline;
  gap: 20px;
`
document.body.prepend(controls)

const redraw = document.createElement('button')
redraw.textContent = "redraw"
controls.append(redraw)

const play = document.createElement('button')
play.textContent = "stop"
controls.append(play)

const handdraw = document.createElement("input")
handdraw.setAttribute("type", "checkbox")
controls.append(handdraw)

// const range = document.createElement("input")
// range.setAttribute("type", "range")
// range.setAttribute("min", "1")
// range.setAttribute("max", "20")
// range.setAttribute("value", "1")
// controls.append(range)

export {
  redraw,
  play,
  handdraw,
  // range,
}