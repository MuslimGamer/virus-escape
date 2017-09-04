Crafty.c('Level', {
    init: function() {
        this.widthInTiles = config("level").widthInTiles;
        this.heightInTiles = config("level").heightInTiles;

        // hash: key is coordinates (eg. "x, y" and value is tile data)
        this.data = {};
        for (var y = 0; y < this.heightInTiles; y++) {
            for (var x = 0; x < this.widthInTiles; x++) {
                this.data[this.getKey(x, y)] = "Empty";
            }
        }

        console.log(this.data);
    },

    create: function(levelNumber) {
        this.levelNumber = levelNumber;
        console.log("Welcome to level " + this.levelNumber);
    },

    getKey: function(x, y) {
        return x + ", " + y;
    }
});