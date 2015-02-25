var THREE = require('three');
var groundBuilder = require('./groundBuilder');
var legoBuilder = require('./legoBuilder');
var geometry = require('./geometry');

var Playground = function(scene, camera, space) {
  this.scene = scene;
  this.camera = camera;
  this.space = space;

  scene.add(new THREE.AmbientLight(0x222222));
  var light1 = new THREE.PointLight(0xffffff);
  light1.position.set(+20, 20, +20);
  scene.add(light1);

  var light2 = new THREE.PointLight(0xffffff);
  light2.position.set(-20, 20, -20);
  scene.add(light2);

  var rigidObjetcts = new THREE.Object3D();
  scene.add(rigidObjetcts);
  space.watch(rigidObjetcts);

  rigidObjetcts.add(groundBuilder.build());

  var ghost = legoBuilder.build2x4();
  ghost.material.opacity = 0.60;
  ghost.position.y += 0.6;
  ghost.name = "ghost";

  this.rigidObjetcts = rigidObjetcts;
  this.ghost = ghost;

  this.mouse = {
    x: 0,
    y: 0
  };
  this.mode = '';

  this.setCreateMode();
  this._configureMouse();
};

Playground.prototype.setCreateMode = function() {
  if (this.mode == 'CREATE') return;

  this.mode = 'CREATE';
  this.scene.add(this.ghost);
  $("#title-bar").html("Mode ajout<br/><em>Espace ou clic pour créer un légo</em>");
};

Playground.prototype.setDeleteMode = function() {
  if (this.mode == 'DELETE') return;

  this.mode = 'DELETE';
  this.scene.remove(this.ghost);
  $("#title-bar").html("Mode suppression<br/><em>Espace ou clic pour supprimer un légo</em>");
};

Playground.prototype.computeIntersects = function() {
  var vector = new THREE.Vector3(
    (this.mouse.x / window.innerWidth) * 2 - 1, -(this.mouse.y / window.innerHeight) * 2 + 1, 0.5);

  vector.unproject(this.camera);
  var raycaster = new THREE.Raycaster(
    this.camera.position,
    vector.sub(this.camera.position).normalize());

  return raycaster.intersectObjects(this.rigidObjetcts.children);
};

Playground.prototype.rotateGhost = function() {
  this.ghost.rotation.y += geometry.degToRad(90);
};

Playground.prototype.setGhostColor = function(cssColor) {
  this.ghost.material.color.setStyle(cssColor);
};

Playground.prototype.buildBrick = function() {
  if (this.space.isSpaceEmpty(this.ghost)) {
    var brick = legoBuilder.build2x4();
    this.rigidObjetcts.add(brick);

    brick.position.copy(this.ghost.position);
    brick.rotation.copy(this.ghost.rotation);
    brick.material.color.copy(this.ghost.material.color);

    this.space.requestUpdate = true;
  }
};

Playground.prototype.destroyBrick = function() {
  var intersects = this.computeIntersects();

  if (intersects.length === 0 || intersects[0].object.name == "ground")
    return;

  this.rigidObjetcts.remove(intersects[0].object);

  this.space.requestUpdate = true;
};

Playground.prototype.handleUserAction = function() {
  if (this.mode == "CREATE") {
    this.buildBrick();
  } else {
    this.destroyBrick();
  }
};

Playground.prototype._configureMouse = function() {
  var playground = this;
  $(document).mousemove(function(event) {
    event.preventDefault();

    playground.mouse.x = event.clientX;
    playground.mouse.y = event.clientY;

    var intersects = playground.computeIntersects();
    if (intersects.length === 0) return;

    var intersect = intersects[0];
    playground.ghost.position.x = Math.round(intersect.point.x);
    playground.ghost.position.y = Math.round(intersect.point.y / 1.2) * 1.2 + 0.6;
    playground.ghost.position.z = Math.round(intersect.point.z);
  });
};

module.exports = Playground;