import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(field of view, window. aspect of ratio, view frustum, view frustum)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Geometery: the{x,y,z} points that makeup a shape 
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

// Material: the wrapping paper for an object
// add color texture etc  
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });

// geometry + material
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

// point light to actual point light to the object 
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
const ambientLight = new THREE.AmbientLight(0xffffff)
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)

// to give controls to your 3d
const controls = new OrbitControls(camera, renderer.domElement)

scene.add(pointLight, ambientLight)
// scene.add(gridHelper, lightHelper)

// adding stars
function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star)
}
Array(200).fill().forEach(addStars)

const spaceTexture = new THREE.TextureLoader().load('/space.jpg')
scene.background = spaceTexture

// function to render over and over again
function animate() {
  requestAnimationFrame(animate);
  // animating the object 
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera)
}

animate()

const imageTexture = new THREE.TextureLoader().load('/vite.svg')

const image = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: imageTexture })
)

scene.add(image)
const moonTexture = new THREE.TextureLoader().load('/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('/normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ 
    map: moonTexture,
  map:normalTexture
  })
)
// moon.position.set(-10, 30);
moon.position.z = 0;
moon.position.setX(-20)
scene.add(moon)


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  image.rotation.y += 0.01;
  image.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  // camera.position.x = t * -0.0002;
  // camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera