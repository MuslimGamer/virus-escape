// "Model" data: doesn't know anything about the view, CraftyJS, etc.
map = {
    init: function(levelNumber) {
        this.widthInTiles = config("level").widthInTiles;
        this.heightInTiles = config("level").heightInTiles;

        // hash: key is coordinates (eg. "x, y" and value is tile data)
        this.data = {};

        for (var y = 0; y < this.heightInTiles; y++) {
            for (var x = 0; x < this.widthInTiles; x++) {
                this.data[this.getKey(x, y)] = "Empty";
            }
        }

        this.levelNumber = levelNumber;
    },

    getKey: function(x, y) {
        return x + ", " + y;
    },

    getTile: function(x, y) {
        return this.data[this.getKey(x, y)];
    }
}