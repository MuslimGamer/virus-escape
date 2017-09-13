QUnit.test("Map: map is defined", function(assert) {
  assert.ok(map != null);
  assert.ok(typeof(map) !== undefined);
});

QUnit.test("Map: init defines width, height, and level number", function(assert) {
  var expectedWidth = 10;
  var expectedHeight = 20;
  var expectedLevel = 3;

  map.init(expectedWidth, expectedHeight, expectedLevel);

  assert.equal(map.widthInTiles, expectedWidth);
  assert.equal(map.heightInTiles, expectedHeight);
  assert.equal(map.levelNumber, expectedLevel);
});

QUnit.test("Map: init defines data with specified width/height", function(assert) {
  var expectedWidth = 50;
  var expectedHeight = 30;

  map.init(expectedWidth, expectedHeight, 77);

  var actualDataSize = Object.keys(map.data).length;
  assert.equal(actualDataSize, expectedWidth * expectedHeight, "Map data should be " + (expectedWidth * expectedHeight) + " items; it's " + actualDataSize);
});

QUnit.test("Map: getTile gets specified tile", function(assert) {
  map.init(5, 10, 1);
  var data = map.data;

  // Test boundaries and a random tile in the middle
  assert.equal(map.getTile(0, 0), data["0, 0"]);
  assert.equal(map.getTile(4, 9), data["4, 9"]);
  assert.equal(map.getTile(4, 0), data["4, 0"]);
  assert.equal(map.getTile(0, 9), data["0, 9"]);
  assert.equal(map.getTile(2, 7), data["2, 7"]);
});

QUnit.test("Map: getPath gets the path between two tiles", function (assert) {
  map.init(8, 8, 1);

  var tile1 = map.getTile(0, 0);
  var tile2 = map.getTile(7, 7);
  assert.equal(map.getPath(tile1, tile2), [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [5, 6], [6, 6], [7, 6], [7, 7]].toString());

  var tile1 = map.getTile(0, 7);
  var tile2 = map.getTile(0, 0);
  assert.equal(map.getPath(tile1, tile2), [[0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [0, 2], [0, 1], [0, 0]].toString());

  var tile1 = map.getTile(5, 6);
  var tile2 = map.getTile(1, 3);
  assert.equal(map.getPath(tile1, tile2), [[5, 6], [5, 5], [4, 5], [4, 4], [3, 4], [2, 4], [2, 3], [1, 3]].toString());

});

QUnit.test("Map: getGrid gets a grid representing the map", function (assert) {
  map.init(8, 8, 1);

  var grid = map.getGrid();

  assert.ok(grid != null);
  assert.ok(typeof (grid) !== undefined);
  assert.equal(grid.height, 8);
  assert.equal(grid.width, 8);
});