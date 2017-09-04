Crafty.c('Player', {
    init: function() {
        var self = this;

        this.requires("Actor")
            .size(32, 32)
            .color('white');
    },
    place: function() {
        // get random x, y coordinates to get a random tile
        // https://stackoverflow.com/a/4550514
        var rx = Math.floor(Math.random() * config("level").widthInTiles)
        var ry = Math.floor(Math.random() * config("level").heightInTiles)

        var tileSize = config("tileSize")
        var pad = config("padding")

        // goodness, this is dirty. Remind me to make a tile class.
        // moves the player to a random tile
        this.move(rx * (tileSize + pad) + 16, ry * (tileSize + pad) + 16)

    }
});