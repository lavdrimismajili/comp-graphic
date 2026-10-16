
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)

camera.position.set(5, 6, 7)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 100, 0, 1.6)
const ambientLight = new THREE.AmbientLight(0xffffff, 2.3)
scene.add(pointLight, ambientLight)

// Sun
const geometry = new THREE.SphereGeometry(2, 32, 24)
const material = new THREE.MeshStandardMaterial({ color: 0xfbff00, 
    wireframe: true
})
const sun = new THREE.Mesh(geometry, material)
scene.add(sun)

// Earth orbit
const earthOrbit = new THREE.Object3D()
sun.add(earthOrbit)

// Earth
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 24),
    new THREE.MeshStandardMaterial({
        color: 0x1e40ff,
        roughness: 0.9
    })
)

earth.position.x = 6
earthOrbit.add(earth)

const moonOrbit = new THREE.Object3D()
earth.add(moonOrbit)

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 24, 16),
    new THREE.MeshStandardMaterial({ color: 0xcccccc })
)

moon.position.x = 1.5
moonOrbit.add(moon)

const marsOrbit = new THREE.Object3D()
sun.add(marsOrbit)

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xc1440e })
)

mars.position.x = 10
marsOrbit.add(mars)

const phobosOrbit = new THREE.Object3D()
mars.add(phobosOrbit)

const phobos = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 24, 16),
    new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
)

phobos.position.x = 0.9
phobosOrbit.add(phobos)

const saturnOrbit = new THREE.Object3D()
sun.add(saturnOrbit)

const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xe3c28a })
)

saturn.position.x = 14
saturnOrbit.add(saturn)

const saturnRing = new THREE.Mesh(
    new THREE.RingGeometry(0.95, 1.6, 64),
    new THREE.MeshStandardMaterial({
        color: 0xc2a878,
        side: THREE.DoubleSide
    })
)

saturnRing.rotation.x = Math.PI / 2.5
saturn.add(saturnRing)

// Controls
const control = new OrbitControls(camera, renderer.domElement)

// Animation
function animate() {
    requestAnimationFrame(animate)

    control.update()

    sun.rotation.y += 0.005

    earthOrbit.rotation.y += 0.01
    earth.rotation.y += 0.05
    moonOrbit.rotation.y += 0.04

    marsOrbit.rotation.y += 0.007
    mars.rotation.y += 0.05
    phobosOrbit.rotation.y += 0.06

    saturnOrbit.rotation.y += 0.004
    saturn.rotation.y += 0.03
    //saturnRing.rotation.y += 0.2

    renderer.render(scene, camera)
}

animate()
