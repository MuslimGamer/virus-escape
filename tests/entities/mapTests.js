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