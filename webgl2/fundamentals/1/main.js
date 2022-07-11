import { width, height, gl, createShader, createProgram } from "../init.js"
import { vertexSrc, fragmentSrc } from "./shaders.js"

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSrc)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSrc)
const program = createProgram(gl, vertexShader, fragmentShader)

// look up where the vertex data needs to go.
const positionAttributeLocation = gl.getAttribLocation(program, "a_position")

// Create a buffer and put three 2d clip space points in it
const positionBuffer = gl.createBuffer()

// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
const positions = new Float32Array([ 0, 0,   0, 0.5,   0.7, 0 ])
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

// Create a vertex array object (attribute state)
const vao = gl.createVertexArray()

// and make it the one we're currently working with
gl.bindVertexArray(vao)

// Turn on the attribute
gl.enableVertexAttribArray(positionAttributeLocation)

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
{
  const size = 2;          // 2 components per iteration
  const type = gl.FLOAT;   // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset
  )
}

// Tell WebGL how to convert from clip space to pixels
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

// Clear the canvas
gl.clearColor(0, 0, 0, 0)
gl.clear(gl.COLOR_BUFFER_BIT)

// Tell it to use our program (pair of shaders)
gl.useProgram(program)

// Bind the attribute/buffer set we want.
gl.bindVertexArray(vao)

// draw
{
  const primitiveType = gl.TRIANGLES
  const offset = 0
  const count = 3
  gl.drawArrays(primitiveType, offset, count)
}