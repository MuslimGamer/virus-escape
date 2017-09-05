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
        newTile.tileData.enter(this.nameInTile)

        this.move(newTile.tileData.x * (config("tileSize") + config("padding")) + config("padding") * 2, 
                  newTile.tileData.y * (config("tileSize") + config("padding")) + config("padding") * 2);

        return this;
    },

    placeInRandomTile: function() {
        var condition = true;

        // get random x, y coordinates to get a random tile
        // https://stackoverflow.com/a/4550514
        while (condition) {
            var tileX = Math.floor(Math.random() * config('level').widthInTiles);
            var tileY = Math.floor(Math.random() * config('level').heightInTiles);
            var newTile = map.getTile(tileX, tileY);

            var condition = Boolean(newTile.tileData.contents)
        }

        this.moveTo(newTile);

        return this;
    }
})