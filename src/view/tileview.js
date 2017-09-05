// Tile: the square unit you can walk on
Crafty.c('Tile', {
    init: function() {
        this.requires('Actor')
            .size(config('tileSize'), config('tileSize'));
    }
});