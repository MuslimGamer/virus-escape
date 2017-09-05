// Tile: the square unit you can walk on
Crafty.c('Tile', {
    init: function() {
        this.requires('Actor');
    },

    tile: function(tileData) {
        // maps the data class as a property
        this.tileData = tileData.tileData
        
        return this;
    }
});