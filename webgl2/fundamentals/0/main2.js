import { gl } from "../init.js"

const vertexSrc =
`#version 300 es

layout(location = 0) in float aPointSize;
layout(location = 1) in vec2 aPosition;
layout(location = 2) in vec3 aColor;

out vec3 vColor;

void main() {
  vColor = aColor;
  gl_PointSize = aPointSize;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const fragmentSrc =
`#version 300 es

precision mediump float;

in vec3 vColor;
out vec4 fragColor;

void main() {
  fragColor = vec4(vColor, 1.0);
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

const aPointSizeLoc = 0
const aPositionLoc = 1
const aColorLoc = 2

// bindAttribLocation should goes before linking program

// gl.bindAttribLocation(program, aPointSizeLoc, "aPointSize")
// gl.bindAttribLocation(program, aPositionLoc, "aPosition")
// gl.bindAttribLocation(program, aColorLoc, "aColor")

gl.linkProgram(program)

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.log(gl.getShaderInfoLog(vertexShader))
  console.log(gl.getShaderInfoLog(fragmentShader))
}

const bufferSrc = new Float32Array([
  0,0,      100,   1,0,0,
  -.5,-.5,  50,    0,1,0,
  -.5,.5,   25,    0,0,1
])

// const aPointSizeLoc = gl.getAttribLocation(program, "aPointSize")
// const aPositionLoc = gl.getAttribLocation(program, "aPosition")
// const aColorLoc = gl.getAttribLocation(program, "aColor")

const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, bufferSrc, gl.STATIC_DRAW)

gl.vertexAttribPointer(aPointSizeLoc, 1, gl.FLOAT, false, 6 * 4, 2 * 4)
gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 6 * 4, 0)
gl.vertexAttribPointer(aColorLoc, 3, gl.FLOAT, false, 6 * 4, 3 * 4)



gl.useProgram(program)

gl.enableVertexAttribArray(aPointSizeLoc)
gl.enableVertexAttribArray(aPositionLoc)
gl.enableVertexAttribArray(aColorLoc)

// gl.drawArrays(gl.POINTS, 0, 3)
gl.drawArrays(gl.TRIANGLES, 0, 3)