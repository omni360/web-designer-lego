var THREE = require('three');
var Plot = require('./Plot');
var geometry = require('./geometry');

var groundGeometry = new THREE.PlaneBufferGeometry(64, 64);

function build() {
  var material = new THREE.MeshPhongMaterial({
    color: 0x427e1a,
    side: THREE.DoubleSide
  });

  var ground = new THREE.Mesh(groundGeometry, material);
  ground.rotation.x = geometry.degToRad(-90);
  ground.name = "ground";

  for (var x = -31.5; x <= 31.5; x++) {
    for (var y = -31.5; y <= 31.5; y++) {
      var cyl = new Plot(material);
      cyl.rotation.x = geometry.degToRad(90);
      cyl.position.set(x, y, 0.2);

      ground.add(cyl);
    }
  }

  return ground;
}

module.exports.build = build;