const canvas = document.createElement("canvas")
canvas.style.width = canvas.style.height = "100%"
document.body.appendChild(canvas)
const { width, height } = canvas.getBoundingClientRect()
canvas.width = width
canvas.height = height

const gl = canvas.getContext("webgl2")

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader);
  return undefined;
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program))
  gl.deleteProgram(program);
  return undefined;
}

export {
  width,
  height,
  gl,
  createShader,
  createProgram,
}