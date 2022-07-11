import { width, height, gl, createShader, createProgram } from "../init.js"
import { vertexSrc, fragmentSrc } from "./shaders.js"

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSrc)
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSrc)
const program = createProgram(gl, vertexShader, fragmentShader)

// look up where the vertex data needs to go.
const positionAttributeLocation = gl.getAttribLocation(program, "a_position")

// look up uniform locations
const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution")
const colorLocation = gl.getUniformLocation(program, "u_color")

// Create a buffer
const positionBuffer = gl.createBuffer()

// Create a vertex array object (attribute state)
const vao = gl.createVertexArray()

// and make it the one we're currently working with
gl.bindVertexArray(vao)

// Turn on the attribute
gl.enableVertexAttribArray(positionAttributeLocation)

// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

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

// Pass in the canvas resolution so we can convert from
// pixels to clipspace in the shader
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

// Pass in the canvas resolution so we can convert from
// pixels to clipspace in the shader
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)

// draw 50 random rectangles in random colors
for (var ii = 0; ii < 50; ++ii) {
  // Put a rectangle in the position buffer
  setRectangle(
    gl, randomInt(width), randomInt(height), randomInt(width), randomInt(height)
  )

  // Set a random color.
  gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1)

  // Draw the rectangle.
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 6;
  gl.drawArrays(primitiveType, offset, count);
}

// Returns a random integer from 0 to range - 1.
function randomInt(range) {
  return Math.floor(Math.random() * range);
}

// Fill the buffer with the values that define a rectangle.
function setRectangle(gl, x1, y1, x2, y2) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}