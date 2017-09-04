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
        this.wd = config("level").widthInTiles;
        this.hg = config("level").heightInTiles;

        this.rx = Math.floor(Math.random() * this.wd);
        this.ry = Math.floor(Math.random() * this.hg);
        

        this.tileSize = config("tileSize");
        this.pad = config("padding");

        // goodness, this is dirty. Remind me to make a tile class.
        // moves the player to a random tile
        this.moveTo();

        return this;

    },
    moveTo: function() {
        this.move(this.rx * (this.tileSize + this.pad) + 16, this.ry * (this.tileSize + this.pad) + 16);
    },
    moving: function(e) {
        var k = e.key;

        if (k == Crafty.keys.UP_ARROW || k == Crafty.keys.W) {
            var it = this.ry;
            var org = this.hg - 1; // minus one because the tiles are zero-based
            var w = -1;

            var ww = 'y';
        }
        else if (k == Crafty.keys.DOWN_ARROW || k == Crafty.keys.S) {
            var it = this.ry;
            var org = this.hg - 1;
            var w = 1;

            var ww = 'y';
        }
        else if (k == Crafty.keys.LEFT_ARROW || k == Crafty.keys.A) {
            var it = this.rx;
            var org = this.wd - 1;
            var w = -1;

            var ww = 'x';
        }
        else if (k == Crafty.keys.RIGHT_ARROW || k == Crafty.keys.D) {
            var it = this.rx;
            var org = this.wd - 1;
            var w = 1;

            var ww = 'x';
        } else {
            return;
        }

        it += w;
        if (!(it > org || it < 0)) {
            if (ww == 'y') {
                this.ry += w;
            } else if (ww == 'x'){
                this.rx += w;
            }

            this.moveTo();
        }
    }
});