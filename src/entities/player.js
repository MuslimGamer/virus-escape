Crafty.c('Player', {
    init: function() {
        var self = this;

        this.requires("Actor, Controllable")
            .size(32, 32)
            .color('white')
            .bind('KeyDown', this.moving);

    },
    place: function() {
        // get random x, y coordinates to get a random tile
        // https://stackoverflow.com/a/4550514
        this.tile_x = Math.floor(Math.random() * config('level').widthInTiles);
        this.tile_y = Math.floor(Math.random() * config('level').heightInTiles);

        this.moveTo(this.tile_x, this.tile_y);

        return this;
    },

    moveTo: function(x, y) {
        // set coordinate properties to given coordinates, just in case
        this.tile_x = x;
        this.tile_y = y;

        this.move(x * (config("tileSize") + config("padding")) + config("padding") * 2, 
                  y * (config("tileSize") + config("padding")) + config("padding") * 2);
    },

    moving: function(e) {
        var k = e.key;

        if (k == Crafty.keys.UP_ARROW || k == Crafty.keys.W) {
            var coordinate = this.tile_y;
            var tileLength = config('level').heightInTiles - 1; // minus one because the tiles are zero-based
            var movement = -1;
            var which = 'y';
        }
        else if (k == Crafty.keys.DOWN_ARROW || k == Crafty.keys.S) {
            var coordinate = this.tile_y;
            var tileLength = config('level').heightInTiles - 1;
            var movement = 1;
            var which = 'y';
        }
        else if (k == Crafty.keys.LEFT_ARROW || k == Crafty.keys.A) {
            var coordinate = this.tile_x;
            var tileLength = config('level').widthInTiles - 1;
            var movement = -1;
            var which = 'x';
        }
        else if (k == Crafty.keys.RIGHT_ARROW || k == Crafty.keys.D) {
            var coordinate = this.tile_x;
            var tileLength = config('level').widthInTiles - 1;
            var movement = 1;
            var which = 'x';
        } else {
            return;
        }

        var ghost = coordinate + movement;
        // check if the movement would keep the player in the grid
        if (!(ghost > tileLength || ghost < 0)) {
            if (which == 'y') {
                this.tile_y += movement;
            } else {
                this.tile_x += movement;
            }
            this.moveTo(this.tile_x, this.tile_y);
        }
    }
});