// "Model" data: doesn't know anything about the view, CraftyJS, etc.
map = {
    init: function(widthInTiles, heightInTiles, levelNumber) {
        this.widthInTiles = widthInTiles;
        this.heightInTiles = heightInTiles;

        this.levelNumber = levelNumber;

        // hash: key is coordinates (eg. "x, y" and value is tile data)
        this.data = {};

        for (var y = 0; y < this.heightInTiles; y++) {
            for (var x = 0; x < this.widthInTiles; x++) {
                this.data[this.getKey(x, y)] = new tileData(x, y);
            }
        }
    },

    getPath: function (tile1, tile2) {
        var grid = this.getGrid();
        var finder = new PF.AStarFinder();
        return finder.findPath(tile1.x, tile1.y, tile2.x, tile2.y, grid);
    },

    getPathToPlayer: function (tile) {
        return this.getPath(tile, this.playerTile);
    },

    getReachableTile: function () {
        var tile = map.getRandomTile();
        var attempts = 0;
        var maxAttempts = this.widthInTiles * this.heightInTiles;
        while (map.getPathToPlayer(tile).length == 0 && attempts < maxAttempts) {
            tile = map.getRandomTile();
            attempts++;
        }
        if (map.getPathToPlayer(tile).length != 0) {
            return tile;
        } else {
            return null;
        }
    },

    // generate a grid representing the map, with 1 as blocked, and 0 as walkable
    getGrid: function () {
        var grid = new PF.Grid(this.widthInTiles, this.heightInTiles);
        for (var y = 0; y < this.heightInTiles; y++) {
            for (var x = 0; x < this.widthInTiles; x++) {
                var tile = map.getTile(x, y);

                if (tile.contents != '') {
                    grid.setWalkableAt(x, y, false);
                }
            }
        }
        return grid;
    },

    newSeed: function () {
        this.seededGen = new Srand();
        if (config('mapSeed') == '') {
            // get random seed
            this.seed = this.seededGen.randomize();
        } else {
            this.seed = config('mapSeed');
            this.seededGen.seed(this.seed);
        }

        console.log('The seed is: "' + this.seed.toString() + '".');

        return this;
    },

    getMoveLimit: function() {
        var diffY = Math.abs(this.winGate.y - this.playerTile.y);
        var diffX = Math.abs(this.winGate.x - this.playerTile.x);

        return (diffY + diffX) + config('extraMoves');
    },

    getRandomTile: function(awayFromTile, seededGen) {
        var isTileOccupied = true;
        var isTooClose = false;

        if (typeof (seededGen) == 'undefined') {
            seededGen = this.seededGen;
        }

        // get random x, y coordinates to get a random tile
        // https://stackoverflow.com/a/4550514
        while (isTileOccupied || isTooClose) {
            var tileX = Math.floor(seededGen.random() * this.widthInTiles);
            var tileY = Math.floor(seededGen.random() * this.heightInTiles);
            var newTile = map.getTile(tileX, tileY);

            if (typeof(awayFromTile) == 'undefined') {
                // check if tile is empty
                isTileOccupied = newTile.contents != '' || newTile.entity != '';
            } else {
                var diffY = Math.abs(tileY - awayFromTile.y);
                var diffX = Math.abs(tileX - awayFromTile.x);

                var distance = diffY + diffX;

                isTooClose = (distance < config('minDistanceBetweenTiles'));
                isTileOccupied = newTile.contents != '' || newTile.entity != '';
            }
        }

        return newTile;
    },

    getTile: function(x, y) {
        return this.data[this.getKey(x, y)];
    },

    // Boundary: methods below are private (by convention only, not enforceable).

    getKey: function(x, y) {
        return x + ", " + y;
    }
};