const getGUI = (...handlers) => {
  const controls = document.createElement('div')
  controls.classList.add("controls")
  document.body.prepend(controls)

  const gui = {}

  for (const handler of handlers) {
    switch(handler.type) {
      case "stats":
        gui.stats = new Stats()
        const container = document.createElement("div")
        container.id = "stats"
        document.body.prepend(container)
        container.append(gui.stats.domElement)
        break
      
      case "button":
        gui[handler.name] = document.createElement("button")
        gui[handler.name].classList.add(handler.name)
        gui[handler.name].textContent = handler.name
        controls.append(gui[handler.name])
        break

      case "number":
        gui[handler.name] = document.createElement("input")
        gui[handler.name].classList.add(handler.name)
        gui[handler.name].setAttribute("type", "number")
        handler.min   != undefined && gui[handler.name].setAttribute("min", handler.min)
        handler.max   != undefined && gui[handler.name].setAttribute("max", handler.max)
        handler.value != undefined && gui[handler.name].setAttribute("value", handler.value)
        controls.append(gui[handler.name])
        break

      case "checkbox":
        gui[handler.name] = document.createElement("input")
        gui[handler.name].classList.add(handler.name)
        gui[handler.name].setAttribute("type", "checkbox")
        handler.checked && gui[handler.name].setAttribute("checked", null)
        controls.append(gui[handler.name])
        break
      
      case "range":
        gui[handler.name] = document.createElement("input")
        gui[handler.name].classList.add(handler.name)
        gui[handler.name].setAttribute("type", "range")
        handler.min   != undefined && gui[handler.name].setAttribute("min", handler.min)
        handler.max   != undefined && gui[handler.name].setAttribute("max", handler.max)
        handler.value != undefined && gui[handler.name].setAttribute("value", handler.value)
        controls.append(gui[handler.name])
        break

      default: break
    }
  }
  
  return gui
}

export default getGUI