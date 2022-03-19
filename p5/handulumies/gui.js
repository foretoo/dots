const controls = document.createElement('div')
controls.classList.add("controls")
document.body.prepend(controls)

const redraw = document.createElement('button')
redraw.textContent = "redraw"
controls.append(redraw)

const play = document.createElement('button')
play.textContent = "stop"
controls.append(play)
play.style.width = play.offsetWidth + "px"

const num = document.createElement('input')
num.setAttribute("type", "number")
num.setAttribute("max", "16")
num.value = 5
controls.append(num)

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
  num,
  handdraw,
  // range,
}