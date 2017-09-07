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


    // for now, we'll just use the current timestamp.
    newSeed: function() {
        if (config('mapSeed') == '') {
            // get random seed
            this.seed = Srand.randomize();
        } else {
            this.seed = config('mapSeed');
            Srand.seed(this.seed);
        }

        console.log('The seed is: "' + this.seed.toString() + '".');

        return this;
    },

    getMoveLimit: function() {
        var diffY = Math.abs(this.winGate.y - this.playerTile.y);
        var diffX = Math.abs(this.winGate.x - this.playerTile.x);

        return (diffY + diffX) + config('extraMoves');
    },

    getRandomTile: function(isWinGate) {
        var isTileOccupied = true;
        var isTooClose = false;

        // DONE: make WinGate not spawn too close to player
        // good seed for testing is 1531171161
        
        // get random x, y coordinates to get a random tile
        // https://stackoverflow.com/a/4550514
        while (isTileOccupied || isTooClose) {
            var tileX = Math.floor(Srand.random() * config('level').widthInTiles);
            var tileY = Math.floor(Srand.random() * config('level').heightInTiles);
            var newTile = map.getTile(tileX, tileY);

            if (!isWinGate) {
                // check if tile is empty
                isTileOccupied = newTile.contents != '';
            } else {
                var diffY = Math.abs(tileY - this.playerTile.y);
                var diffX = Math.abs(tileX - this.playerTile.x);

                var distance = diffY + diffX;

                isTooClose = (distance < config('minDistanceToGate'));
                isTileOccupied = newTile.contents != '';
            }
        }

        if (isWinGate) {
            this.winGate = newTile;
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