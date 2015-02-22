function createGround(scene) {

  "use strict";

  var material = new THREE.MeshPhongMaterial({
    color: 0x427e1a,
    side: THREE.DoubleSide
  });

  var plotGeometry = new THREE.CylinderGeometry(0.32, 0.32, 1.2 / 3, 16);

  var ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(64, 64), material);
  ground.rotation.x = degToRad(-90);
  ground.name = "ground";

  for (var x = -31.5; x <= 31.5; x++) {
    for (var y = -31.5; y <= 31.5; y++) {
      var cyl = new THREE.Mesh(plotGeometry, material);
      cyl.rotation.x = degToRad(90);
      cyl.position.set(x, y, 0.2);
      ground.add(cyl);
    }
  }

  if (scene) {
    scene.add(ground);
  }

  return ground;
}