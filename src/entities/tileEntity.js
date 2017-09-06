// The entity occupying a tile
Crafty.c('TileEntity', {
    init: function() {
        this.requires('Actor')
            .size(32, 32);

        // Must be implemented in every sub-class
        this.nameInTile = 'Default';

    },

    moveTo: function(newTile) {
        this.tile = newTile;
        newTile.enter(this);

        this.move(newTile.x * (config("tileSize") + config("padding")) + config("padding") * 2, 
                  newTile.y * (config("tileSize") + config("padding")) + config("padding") * 2);

        return this;
    },

    placeInRandomTile: function() {
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

        this.moveTo(newTile);

        return this;
    }
});