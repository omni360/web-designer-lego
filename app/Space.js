var Space = (function() {

  "use strict";

  var space = [];
  var bricks = [];

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

  this.update = function() {
    if (this.requestUpdate) {
      space = [];
      bricks.forEach(function(lego) {
        if (lego.name != 'ground') {
          space = space.concat(buildBrickSpace(lego));
        }
      });
      this.requestUpdate = false;
    }
  };

  this.isSpaceEmpty = function(brick) {
    var empty = true;
    buildBrickSpace(brick).forEach(function(point) {
      space.forEach(function(row) {
        if (row.x == point.x && row.y == point.y && row.z == point.z) {
          empty = false;
        }
      });
    });
    return empty;
  };

  this.watch = function(legos) {
    bricks = legos.children;
  };

  this.requestUpdate = false;

});