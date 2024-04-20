// import './style.css'
import * as THREE from './three.module.js'

// import { OrbitControls } from './OrbitControls.js'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


const geometry = new THREE.BoxGeometry( 10, 10, 10 ); 
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} ); 
const cube = new THREE.Mesh( geometry, material ); 


scene.add( cube );

// LIGHTS
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);
scene.add(ambientLight);

// const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
  cube.rotation.z += 0.001;
  // controls.update();
  renderer.render(scene, camera);
}
// renderer.render(scene, camera);
animate();