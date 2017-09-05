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
                // get the original tile data class
                var tileData = this.map.getTile(x, y)
                
                // make a Crafty tile and add the data class properties to it using .tile
                var mapTile = Crafty.e('Tile')
                                    .tile(tileData)
                                    .size(tileSize, tileSize)
                                    .move(x * (tileSize + config("padding")), y * (tileSize + config("padding")))
                                    .color("blue");

                // map the Crafty tile to the map object, instead of the normal data class.
                this.map.setTile(x, y, mapTile);
            }
        }
    }
})