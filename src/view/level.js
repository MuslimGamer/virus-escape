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
// Level: the thing you see on the screen. Uses a map for data.
Crafty.c('Level', {
    init: function() {
        this.requires("Actor");
        var paddedWidth = config("tileSize") + config("padding");
        var paddedHeight = config("tileSize") + config("padding");

        this.color("#000088")
            .size(config("level").widthInTiles * paddedWidth, config("level").heightInTiles * paddedHeight);
    },

    loadMap: function(map) {
        this.map = map;
        var tileSize = config("tileSize");

        for (var y = 0; y < this.map.heightInTiles; y++) {
            for (var x = 0; x < this.map.widthInTiles; x++) {
                var tilebase = this.map.getTile(x, y)
                
                var mapTile = Crafty.e('Tile')
                                    .Tile(tilebase)
                                    .size(tileSize, tileSize)
                                    .move(x * (tileSize + config("padding")), y * (tileSize + config("padding")))
                                    .color("blue");

                this.map.setTile(x, y, mapTile);
            }
        }
    }
})