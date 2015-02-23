var THREE = require('three');
var groundBuilder = require('./groundBuilder');
var legoBuilder = require('./legoBuilder');
var geometry = require('./geometry');

module.exports = function(scene, camera, space) {

  "use strict";

  var keyListener = new window.keypress.Listener();

  var titleBar = $("#title-bar"),
    mouseX = 0,
    mouseY = 0,
    mode = '';

  scene.add(new THREE.AmbientLight(0x222222));
  var light = new THREE.PointLight(0xffffff);
  light.position.set(2, 8, 5);
  scene.add(light);

  var rigidObjetcts = new THREE.Object3D();
  scene.add(rigidObjetcts);
  space.watch(rigidObjetcts);

  var ground = groundBuilder.build();
  rigidObjetcts.add(ground);

  var ghost = legoBuilder.build2x4();
  ghost.material.opacity = 0.60;
  ghost.position.y += 0.6;
  ghost.name = "ghost";

  setCreateMode();


  function setCreateMode() {
    if (mode == 'CREATE') return;

    mode = 'CREATE';
    scene.add(ghost);
    titleBar.html("Mode ajout<br/><em>Espace ou clic pour créer un légo</em>");
  }

  function setDeleteMode() {
    if (mode == 'DELETE') return;

    mode = 'DELETE';
    scene.remove(ghost);
    titleBar.html("Mode suppression<br/><em>Espace ou clic pour supprimer un légo</em>");
  }

  function computeIntersects() {
    var vector = new THREE.Vector3((mouseX / window.innerWidth) * 2 - 1, -(mouseY / window.innerHeight) * 2 + 1, 0.5);

    vector.unproject(camera);
    var raycaster = new THREE.Raycaster(
      camera.position,
      vector.sub(camera.position).normalize());

    return raycaster.intersectObjects(rigidObjetcts.children);
  }

  function rotateGhost() {
    ghost.rotation.y += geometry.degToRad(90);
  }

  function buildBrick() {
    if (space.isSpaceEmpty(ghost)) {
      var brick = legoBuilder.build2x4();
      rigidObjetcts.add(brick);

      brick.position.copy(ghost.position);
      brick.rotation.copy(ghost.rotation);
      brick.material.color.copy(ghost.material.color);

      space.requestUpdate = true;
    }
  }

  function destroyBrick() {
    var intersects = computeIntersects();

    if (intersects.length === 0 || intersects[0].object.name == "ground")
      return;

    rigidObjetcts.remove(intersects[0].object);

    space.requestUpdate = true;
  }

  function handleUserAction() {
    if (mode == "CREATE") {
      buildBrick();
    } else {
      destroyBrick();
    }
  }

  function toggleHelp() {
    $('#help-panel').fadeToggle();
  }


  $(document).mousemove(function(event) {
    event.preventDefault();

    mouseX = event.clientX;
    mouseY = event.clientY;

    var intersects = computeIntersects();

    if (intersects.length === 0) return;

    var intersect = intersects[0];
    ghost.position.x = Math.round(intersect.point.x);
    ghost.position.y = Math.round(intersect.point.y / 1.2) * 1.2 + 0.6;
    ghost.position.z = Math.round(intersect.point.z);
  });

  keyListener.simple_combo("space", handleUserAction);
  keyListener.simple_combo("c", setCreateMode);
  keyListener.simple_combo("d", setDeleteMode);
  keyListener.simple_combo("r", rotateGhost);
  keyListener.simple_combo("h", toggleHelp);

  $("canvas").click(function(event) {
    if (event.button == THREE.MOUSE.LEFT) {
      handleUserAction();
    }
  });

  $("#rotate-btn").click(rotateGhost);
  $("#create-btn").click(setCreateMode);
  $("#delete-btn").click(setDeleteMode);
  $('#menu-item-help').click(toggleHelp);

  $('#picker-btn').click(function() {
    $("#color-picker").slideToggle();
  });
  $('#color-picker li').click(function() {
    var cssColor = $(this).css('background-color');
    $("#color-picker").slideToggle();
    ghost.material.color.setStyle(cssColor);
  });
};