var THREE = require('three');
var Plot = require('./Plot');

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
      var cyl = new Plot(material);
      cyl.position.set(x, 0.8, y);

      body.add(cyl);
    }
  }

  return body;
}

module.exports.build2x4 = build2x4;