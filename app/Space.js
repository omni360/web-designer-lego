function buildBrickSpace(lego) {
  var brickSpace = [];

  lego.children.forEach(function(child) {
    var pos = child.position.clone();
    pos.applyMatrix4(lego.matrix);

    brickSpace.push({
      x: Math.round(pos.x * 100) / 100,
      y: Math.round(pos.y * 100) / 100,
      z: Math.round(pos.z * 100) / 100,
    });
  });

  return brickSpace;
}

var Space = function() {
  this.space = [];
  this.bricks = [];
  this.requestUpdate = false;
};

Space.prototype.update = function() {
  var object = this;

  if (object.requestUpdate) {
    object.space = [];
    object.bricks.forEach(function(lego) {
      if (lego.name != 'ground') {
        object.space = object.space.concat(buildBrickSpace(lego));
      }
    });
    object.requestUpdate = false;
  }
};

Space.prototype.isSpaceEmpty = function(brick) {
  var object = this;

  var empty = true;
  buildBrickSpace(brick).forEach(function(point) {
    object.space.forEach(function(row) {
      if (row.x == point.x && row.y == point.y && row.z == point.z) {
        empty = false;
      }
    });
  });
  return empty;
};

Space.prototype.watch = function(legos) {
  this.bricks = legos.children;
};

module.exports = Space;