var Application = (function() {

  "use strict";

  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  var scene = new THREE.Scene();
  var space = new Space();
  var camera = null;
  var controls = null;
  var playground = null;

  function initScene() {
    var width = window.innerWidth,
      height = window.innerHeight;

    renderer.setSize(width, height);
    renderer.setClearColor(0xFFFFFF, 1);
    $("#appContainer").append(renderer.domElement);

    camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.set(0, 4, 4);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    controls = new THREE.OrbitControls(camera);
    controls.mouseButtons.ORBIT = THREE.MOUSE.MIDDLE;
    controls.mouseButtons.ZOOM = 4;

    playground = new Playground(scene, camera, space);

    requestAnimationFrame(render);
  }

  function render() {
    renderer.render(scene, camera);
    space.update();
    requestAnimationFrame(render);
  }

  window.onload = initScene;
})();