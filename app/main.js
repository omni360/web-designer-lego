var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);
var Playground = require('./Playground');

var renderer = null,
  scene = null,
  camera = null,
  controls = null,
  space = null,
  playground = null;

var keyListener = new window.keypress.Listener();

function initGui() {
  function toggleHelp() {
    $('#help-panel').fadeToggle();
  }

  keyListener.simple_combo("space", function() {
    playground.handleUserAction();
  });
  keyListener.simple_combo("c", function() {
    playground.setCreateMode();
  });
  keyListener.simple_combo("d", function() {
    playground.setDeleteMode();
  });
  keyListener.simple_combo("r", function() {
    playground.rotateGhost();
  });
  keyListener.simple_combo("h", toggleHelp);

  $("canvas").click(function(event) {
    if (event.button == THREE.MOUSE.LEFT) {
      playground.handleUserAction();
    }
  });

  $("#rotate-btn").click(function() {
    playground.rotateGhost();
  });
  $("#create-btn").click(function() {
    playground.setCreateMode();
  });
  $("#delete-btn").click(function() {
    playground.setDeleteMode();
  });
  $('#menu-item-help').click(toggleHelp);

  $('#picker-btn').click(function() {
    $("#color-picker").slideToggle();
  });
  $('#color-picker li').click(function() {
    $("#color-picker").slideToggle();
    playground.setGhostColor($(this).css('background-color'));
  });
}

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

  initGui();

  requestAnimationFrame(render);
}

function render() {
  renderer.render(scene, camera);
  space.update();
  requestAnimationFrame(render);
}

window.onload = initScene;