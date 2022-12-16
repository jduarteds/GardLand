import * as THREE from '../../node_modules/three/build/three.module.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import gsap from '../../node_modules/gsap/all.js'


const gltfLoader = new GLTFLoader();

// Scene

const scene = new THREE.Scene();
let tl = gsap.timeline();

// Create our 3D Model

/*
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
*/

gltfLoader.load('../../img/model.gltf', function(gltf) {

    console.log(gltf);
    
    const model = gltf.scene;
    model.scale.set(0.5, 0.5, 0.5);
    model.rotation.set(0.5, 0, 0);
    model.position.set(0,1,0);
    scene.add(model);
    
    
    tl.to(gltf.scene.rotation, {y: 4, duration: 1})
    tl.to(gltf.scene.scale, {x: 0.25 ,y: 0.25,z: 0.25, duration: 1}, "-=1")
    tl.to(gltf.scene.position, {x: -4, duration: 1})
    tl.to(gltf.scene.rotation, {x: 0.55, z: 0.15, duration: 1}, "-=1")
    tl.to(gltf.scene.position, {y: 1, duration: 1}, "-=1")
    

}, function(xhr) {
    console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error) {
    console.log("An error as occured")
})


// Camera

const camera = new THREE.PerspectiveCamera(50, window.innerWidth/800, 0.1, 100);
camera.position.x = 0
camera.position.y = 0
camera.position.z = 10;
scene.add(camera);

// Lights

const pointLight = new THREE.DirectionalLight(0xffffff, 0.9)
pointLight.position.set(2,2,5)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 0.6)
pointLight.position.x = 10
pointLight.position.y = 5
pointLight.position.z = 0
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff, 0.6)
pointLight.position.x = 0
pointLight.position.y = 5
pointLight.position.z = 10
scene.add(pointLight3)

// Renderer

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(window.innerWidth, 800);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


function tick (){

   
    // Call tick again on the next frame
    requestAnimationFrame(tick)
    // Render
    renderer.render(scene, camera)

    
}
tick()