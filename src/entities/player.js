Crafty.c('Player', {
    init: function() {
        var self = this;

        // Tiled already requires Actor
        this.requires("Tiled, Controllable")
            .size(32, 32)
            .color('white')
            .bind('KeyDown', this.moving);

        this.bind('PlayerMoved', this.moved);
        
        this.nameInTile = 'Player'
    },

    moved: function() {
        if (this.tile.tiledata.contains('WinGate')) {
            Game.completeLevel()
        }
    },

    moving: function(e) {
        var k = e.key;

        if (k == Crafty.keys.UP_ARROW || k == Crafty.keys.W) {
            var tileLength = config('level').heightInTiles - 1; // minus one because the tiles are zero-based
            var movement = -1;
            var which = 'y';
        }
        else if (k == Crafty.keys.DOWN_ARROW || k == Crafty.keys.S) {
            var tileLength = config('level').heightInTiles - 1;
            var movement = 1;
            var which = 'y';
        }
        else if (k == Crafty.keys.LEFT_ARROW || k == Crafty.keys.A) {
            var tileLength = config('level').widthInTiles - 1;
            var movement = -1;
            var which = 'x';
        }
        else if (k == Crafty.keys.RIGHT_ARROW || k == Crafty.keys.D) {
            var tileLength = config('level').widthInTiles - 1;
            var movement = 1;
            var which = 'x';
        } else {
            return;
        }
        y = this.tile.tiledata.y;
        x = this.tile.tiledata.x;

        if (which == 'y') {
            y += movement;
        } else {
            x += movement;
        }

        newtile = map.getTile(x, y);
        
        if (newtile == null || newtile.walkable == false) {
            return;
        }
        // handle removing player from tile's contains array
        this.tile.tiledata.leave('Player')
        
        this.moveTo(newtile);
        Crafty.trigger('PlayerMoved');
    }
});