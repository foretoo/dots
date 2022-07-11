import { gl } from "../init.js"

const vertexSrc =
`#version 300 es

uniform float uPointSize;
uniform vec2 uPosition;

void main() {
  gl_PointSize = uPointSize;
  gl_Position = vec4(uPosition, 0.0, 1.0);
}`

const fragmentSrc =
`#version 300 es

precision mediump float;

uniform int uIndex;
uniform vec4 uColors[3];

out vec4 fragColor;

void main() {
  fragColor = uColors[uIndex];
}`

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vertexSrc)
gl.compileShader(vertexShader)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragmentSrc)
gl.compileShader(fragmentShader)

const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.log(gl.getShaderInfoLog(vertexShader))
  console.log(gl.getShaderInfoLog(fragmentShader))
}



const uPointSizeLoc = gl.getUniformLocation(program, "uPointSize")
const uPositionLoc = gl.getUniformLocation(program, "uPosition")
const uIndex = gl.getUniformLocation(program, "uIndex")
const uColors = gl.getUniformLocation(program, "uColors")

gl.useProgram(program)

gl.uniform1f(uPointSizeLoc, 100)
gl.uniform2f(uPositionLoc, 0, 0.5)
gl.uniform1i(uIndex, 2)
gl.uniform4fv(uColors, [
  1,0,0,1,
  0,1,0,1,
  0,0,1,1
])

gl.drawArrays(gl.POINTS, 0, 1)

gl.uniform2f(uPositionLoc, 0, -.5)
gl.uniform1i(uIndex, 1)

gl.drawArrays(gl.POINTS, 0, 1)