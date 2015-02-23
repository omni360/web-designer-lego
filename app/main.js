var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var Playground = require('./Playground');

var renderer = null,
  scene = null,
  camera = null,
  space = null,
  controls = null,
  playground = null;

function initScene() {
  var width = window.innerWidth,
    height = window.innerHeight;

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0xFFFFFF, 1.0);
  $("#appContainer").append(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  camera.position.set(0, 4, 4);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  controls = new OrbitControls(camera);
  controls.mouseButtons.ORBIT = THREE.MOUSE.MIDDLE;
  controls.mouseButtons.ZOOM = 4;

  space = new Space();

  playground = new Playground(scene, camera, space);

  requestAnimationFrame(render);
}

function render() {
  renderer.render(scene, camera);
  space.update();
  requestAnimationFrame(render);
}

window.onload = initScene;