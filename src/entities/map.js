// the seed based generator
// TODO: figure out how to access automatically generated internal seed.
// for now, we'll just use the current timestamp.
var seedGen = {
    newSeed: function() {
        var seed = Date.now();
        // var seed = 'hello';
        // the above seed gets unsolvable at level 16.
        console.log('The seed is: "' + seed.toString() + '".');
        this.rng = new Math.seedrandom(seed);

        return this;
    },
};
seedGen.newSeed();

// tile data class constructor
function tileData(x, y) {
    this.tileData = {
        x: x,
        y: y,

        walkable: true,
        contents: '',

        enter: function(thing) {
            this.contents = thing.nameInTile;

            return this;
        },

        leave: function() {
            switch (config('WalkedTileSetting')) {
                case 0:
                    this.contents = '';
                    break;
                case 1:
                    this.contents = '';
                    this.view.color('silver');
                    this.walkable = false;
                    break;
                case 2:
                    this.contents = 'DangerTile';
                    this.view.color('silver');
                    break;
            }

            return this;
        },

        setView: function(view) {
            this.view = view;

            return this;
        },

        setDangerTile: function() {
            this.view.color('red');
            this.contents = 'DangerTile';

            return this;
        },

        setWinGate: function() {
            this.view.color('green');
            this.contents = 'WinGate';

            return this;
        },

        setSwitch: function(switchGate) {
            this.view.color('yellow');
            this.contents = 'Switch';
            this.isOn = true;
            this.switchGate = switchGate;

            return this;
        },

        activate: function() {
            if (this.contents != 'Switch') {
                return this;
            }

            this.isOn = false;
            this.view.color('yellow', 0.5);
            this.switchGate.isOn = false;
            this.switchGate.view.color('maroon', 0.5);

            return this;
        },

        setSwitchGate: function() {
            this.view.color('maroon');
            this.contents = 'SwitchGate';
            this.isOn = true;

            return this;
        }


    };
    
    return this.tileData;
}

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

    getRandomTile: function() {
        var isTileOccupied = true;
        
        // get random x, y coordinates to get a random tile
        // https://stackoverflow.com/a/4550514
        while (isTileOccupied) {
            var tileX = Math.floor(seedGen.rng() * config('level').widthInTiles);
            var tileY = Math.floor(seedGen.rng() * config('level').heightInTiles);
            var newTile = map.getTile(tileX, tileY);

            // check if tile is empty
            var isTileOccupied = newTile.contents != '';
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