// Tile: the square unit you can walk on
Crafty.c('Tile', {
    init: function() {
        this.requires('Actor');
    },

    Tile: function(tilebase) {
        // maps the data class as a property
        this.tiledata = tilebase.tiledata
        
        return this;
    }
});