Crafty.c('Tiled', {
    init: function() {
        this.requires('Actor');

        // Must be implemented in every sub-class
        this.nameInTile = 'Default';

        // array of things that mark the tile as occupied, 
        // and therefore, shouldn't allow anything 
        // else to spawn in the same tile
        this.blockers = ['Player', 'WinGate', 'AntiVirus'];
    },

    moveTo: function(newtile) {
        this.tile = newtile;
        newtile.tiledata.enter(this.nameInTile)

        this.move(newtile.tiledata.x * (config("tileSize") + config("padding")) + config("padding") * 2, 
                  newtile.tiledata.y * (config("tileSize") + config("padding")) + config("padding") * 2);

        return this;
    },

    placeInRandomTile: function() {
        var condition = true;

        // get random x, y coordinates to get a random tile
        // https://stackoverflow.com/a/4550514
        while (condition) {
            var tileX = Math.floor(Math.random() * config('level').widthInTiles);
            var tileY = Math.floor(Math.random() * config('level').heightInTiles);
            var newtile = map.getTile(tileX, tileY);

            var condition = newtile.tiledata.containsArray(this.blockers);
        }

        this.moveTo(newtile);

        return this;
    }
})