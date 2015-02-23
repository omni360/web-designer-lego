var THREE = require('three');
var plotGeometry = new THREE.CylinderGeometry(0.32, 0.32, 1.2 / 3, 16);
var bodyGeometry = new THREE.BoxGeometry(2, 1.2, 4);

function build2x4() {
  var material = new THREE.MeshPhongMaterial({
    color: 0xf9020e,
    transparent: true,
  });

  var body = new THREE.Mesh(bodyGeometry, material);
  body.name = "Lego:2x4";

  for (var x = -0.5; x <= 0.5; x++) {
    for (var y = -1.5; y <= 1.5; y++) {
      var cyl = new THREE.Mesh(plotGeometry, material);
      cyl.position.set(x, 0.8, y);
      cyl.name = "plot";

      body.add(cyl);
    }
  }

  return body;
}

module.exports.build2x4 = build2x4;