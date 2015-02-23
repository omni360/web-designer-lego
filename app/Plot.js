var THREE = require('three');

var plotGeometry = new THREE.CylinderGeometry(0.32, 0.32, 1.2 / 3, 16);

module.exports = function(material) {
  var plot = new THREE.Mesh(plotGeometry, material);
  plot.name = "plot";
  return plot;
};