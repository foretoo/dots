const controls = document.createElement('div')
controls.style.cssText = `
  position: absolute;
  padding: 20px;
  display: flex;
  align-items: baseline;
  gap: 20px;
`
document.body.prepend(controls)

const button = document.createElement('button')
button.textContent = "redraw"
controls.append(button)

const checkbox = document.createElement("input")
checkbox.setAttribute("type", "checkbox")
controls.append(checkbox)

const range = document.createElement("input")
range.setAttribute("type", "range")
range.setAttribute("min", "1")
range.setAttribute("max", "20")
range.setAttribute("value", "1")
controls.append(range)

export {
  button,
  checkbox,
  range,
}