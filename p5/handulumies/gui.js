const controls = document.createElement('div')
controls.classList.add("controls")

const reset = document.createElement('button')
reset.textContent = "reset"

const play = document.createElement('button')
play.textContent = "stop"

const num = document.createElement('input')
num.setAttribute("type", "number")
num.value = 9

const handdraw = document.createElement("input")
handdraw.setAttribute("type", "checkbox")

const range = document.createElement("input")
range.setAttribute("type", "range")
range.setAttribute("min", "1")
range.setAttribute("max", "20")
range.setAttribute("value", "1")

const guis = {
  reset, play, num, handdraw, range
}

const getGUI = (...handlers) => {
  document.body.prepend(controls)
  const output = {}
  for (const name of handlers) {
    output[name] = guis[name]
    controls.append(guis[name])
    if (name === "play")
      guis[name].style.width = guis[name].offsetWidth + "px"
  }
  return output
}

export {
  reset,
  play,
  num,
  handdraw,
  range,
  getGUI,
}