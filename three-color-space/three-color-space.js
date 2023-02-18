import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { throttle } from '../utils.js'



////
////
//// SETUP

const colors = Array(16).fill().map(() => Math.random() * 0xffffff | 0)

const scene = new THREE.Scene()
const _scene = new THREE.Group()
scene.add(_scene)

const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100)
camera.position.set(0, 2, 7)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.max(devicePixelRatio, 2))
renderer.setSize(innerWidth, innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.xr.enabled = true
renderer.xr.setFramebufferScaleFactor(2.0)
document.body.prepend(renderer.domElement)

const enterVRButton = VRButton.createButton(renderer)
document.body.append(enterVRButton)

const controls = new OrbitControls(camera, renderer.domElement)

const meshes = new THREE.Group()
_scene.add(meshes)

const raycaster = new THREE.Raycaster()

const gizmo = new THREE.Matrix4()

const LINE_LENGTH = 20
const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(), new THREE.Vector3(0,0,-1)
]))
line.name = 'line'
line.scale.z = LINE_LENGTH

const EMMISIVE = 0x444444



////
////
//// LIGHT

const hemiLight = new THREE.HemisphereLight(0xffeedd, 0x778899, 0.8)
_scene.add(hemiLight)

const directLight = new THREE.DirectionalLight(0xffffff, 1.2)
directLight.position.set(6, 9, 3)

directLight.castShadow = true
directLight.shadow.mapSize.set(4096, 4096)
directLight.shadow.camera.top = 10
directLight.shadow.camera.bottom = -10
directLight.shadow.camera.right = 10
directLight.shadow.camera.left = -10
directLight.shadow.camera.near = 0.1
directLight.shadow.camera.far = 20
directLight.shadow.camera.updateProjectionMatrix()
_scene.add(directLight)

// const directLightCamera = new THREE.CameraHelper(directLight.shadow.camera)
// directLightCamera.visible = true
// _scene.add(directLightCamera)



////
////
//// MESHES

const geometries = [
  new THREE.BoxGeometry(),
  new THREE.SphereGeometry(),
  new THREE.ConeGeometry(),
  new THREE.TorusGeometry(),
]

for (const color of colors) {
  const mesh = new THREE.Mesh(
    geometries[Math.random() * geometries.length | 0],
    new THREE.MeshStandardMaterial({ color, flatShading: true }),
  )
  mesh.position.set(rand(3), rand(3), rand(3))
  mesh.rotation.set(rand(Math.PI), rand(Math.PI), rand(Math.PI))
  mesh.castShadow = true
  mesh.receiveShadow = true
  meshes.add(mesh)
}



////
////
//// VR CONTROLS

const XRModelFactory = new XRControllerModelFactory()
const rightGrip = renderer.xr.getControllerGrip(0)
rightGrip.add(XRModelFactory.createControllerModel(rightGrip))
scene.add(rightGrip)
const leftGrip = renderer.xr.getControllerGrip(1)
leftGrip.add(XRModelFactory.createControllerModel(leftGrip))
scene.add(leftGrip)

const rightController = renderer.xr.getController(0)
rightController.addEventListener('selectstart', onSelectStart)
rightController.addEventListener('selectend', onSelectEnd)
rightController.addEventListener('connected', (e) => {
  rightController.gamepad = e.data.gamepad
})
rightController.userData.selected = null
rightController.userData.intersected = null
scene.add(rightController)

const leftController = renderer.xr.getController(1)
leftController.addEventListener('selectstart', onSelectStart)
leftController.addEventListener('selectend', onSelectEnd)
leftController.addEventListener('connected', (e) => {
  leftController.gamepad = e.data.gamepad
})
leftController.userData.selected = null
leftController.userData.intersected = null
scene.add(leftController)

rightController.add(line.clone())
leftController.add(line.clone())



function onSelectStart({ target: controller }) {
  intersectObjects(controller)
  if (!controller.userData.intersected) return

  controller.userData.selected = controller.userData.intersected
  controller.userData.selected.material.emissive.set(0x000000)
  controller.attach(controller.userData.selected)
}

function onSelectEnd({ target: controller }) {
  if (!controller.userData.selected) return

  meshes.attach(controller.userData.selected)
  controller.userData.selected = null
}



////
////
//// RENDER

const tryIntersect = throttle(() => {
  clearIntersected(rightController)
  clearIntersected(leftController)
  intersectObjects(rightController)
  intersectObjects(leftController)
}, 125)

renderer.setAnimationLoop(() => {
  tryIntersect()
  handleGamepad(rightController)
  handleGamepad(leftController)

  controls.update()
  renderer.render(scene, camera)
})



////
////
//// UTILS

onresize = () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
}

function rand(range) {
  return (Math.random() - 0.5) * 2 * range
}

const mirrorScalarVector = new THREE.Vector3(-1, 1, -1).multiplyScalar(0.25)
renderer.xr.addEventListener('sessionstart', () => {
  _scene.position.copy(camera.position).multiply(mirrorScalarVector)
  _scene.scale.multiplyScalar(0.25)
})
renderer.xr.addEventListener('sessionend', () => {
  _scene.position.set(0,0,0)
  _scene.scale.set(1,1,1)
})

function getIntersections(controller) {
  gizmo.identity().extractRotation(controller.matrixWorld)
  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld)
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(gizmo)

  return raycaster.intersectObjects(meshes.children, false)
}

function intersectObjects(controller) {
  if (controller.userData.selected) return

  const line = controller.getObjectByName('line')
  const intersections = getIntersections(controller)

  if (!intersections.length) {
    line.scale.z = LINE_LENGTH
    return
  }

  const { object, distance } = intersections[0]

  controller.userData.intersected = object
  controller.userData.intersected.material.emissive.set(EMMISIVE)
  line.scale.z = distance
}

function clearIntersected(controller) {
  controller.userData.intersected?.material.emissive.set(0x000000)
  controller.userData.intersected = null
}

function handleGamepad(controller) {
  if (!controller.userData.selected) return
}



////
////
//// DOM

const decodeSwitchBtn = document.querySelector('#encode-switcher')
decodeSwitchBtn.onclick = setEncoding
setEncoding()

function setEncoding() {
  if (renderer.outputEncoding === THREE.LinearEncoding) {
    decodeSwitchBtn.textContent = 'sRGB on'
    renderer.outputEncoding = THREE.sRGBEncoding
  } else {
    decodeSwitchBtn.textContent = 'sRGB off'
    renderer.outputEncoding = THREE.LinearEncoding
  }
}

const toneMapperBtn = document.querySelector('#tone-mapper')

const tone = (() => {
  let i = 0
  const tones = [
    'NoToneMapping',
    'LinearToneMapping',
    'ReinhardToneMapping',
    'CineonToneMapping',
    'ACESFilmicToneMapping',
  ]
  return {
    get() { return tones[i] },
    set(id) { i = id % tones.length },
    next() { i = ++i % tones.length },
  }
})()
tone.set(4)

toneMapperBtn.onclick = setToneMapping
setToneMapping()

function setToneMapping() {
  renderer.toneMapping = THREE[tone.get()]
  toneMapperBtn.textContent = tone.get()
  tone.next()
}