// tile data class constructor
function tileData(x, y) {
    this.tileData = {
        x: x,
        y: y,

        walkable: true,
        contents: '',
        entity: null,

        enter: function(thing) {
            this.contents = thing.nameInTile;
            this.entity = thing;
        },

        leave: function() {
            this.contents = '';
            this.entity = null;
        }
    }
    
    return this;
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
    
    getTile: function(x, y) {
        return this.data[this.getKey(x, y)];
    },

    // intended to be used after combining tile entity and tileData class
    setTile: function(x, y, TileView) {
        // TileView is the actual Crafty entity; we're setting it here to
        // make it accessible using map.getTile, after we've added the data class's properies.
        // see level.js
        this.data[this.getKey(x, y)] = TileView;
    },

    // Boundary: methods below are private (by convention only, not enforceable).

    getKey: function(x, y) {
        return x + ", " + y;
    }
}