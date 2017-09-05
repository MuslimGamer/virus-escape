// tile class constructor
function tiledata(x, y) {
    this.tiledata = {
        x: x,
        y: y,

        walkable: true,
        contains: [],

        enter: function(thing) {
            this.contains.push(thing);
        },

        leave: function(thing) {
            index = this.contains.indexOf(thing);
            this.contains.splice(index, 1);
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
                this.data[this.getKey(x, y)] = new tiledata(x, y);
            }
        }
    },
    
    getTile: function(x, y) {
        return this.data[this.getKey(x, y)];
    },

    // intended to be used after combining tile entity and tiledata class
    setTile: function(x, y, newobj) {
        this.data[this.getKey(x, y)] = newobj;
    },

    // Boundary: methods below are private (by convention only, not enforceable).

    getKey: function(x, y) {
        return x + ", " + y;
    }
}