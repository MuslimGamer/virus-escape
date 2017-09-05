Crafty.c('Player', {
    init: function() {
        // Tiled already requires Actor
        this.requires("Tiled, Controllable")
            .size(32, 32)
            .color('white')
            .bind('KeyDown', this.moving);

        this.bind('PlayerMoved', this.moved);
        
        this.nameInTile = 'Player';
    },

    moved: function() {
        if (this.tile.tiledata.contains('WinGate')) {
            Game.completeLevel()
        } else if (this.tile.tiledata.contains('AntiVirus')) {
            Game.loseLevel()
        }
    },

    moving: function(e) {
        var k = e.key;

        if (k == Crafty.keys.UP_ARROW || k == Crafty.keys.W) {
            var movement = -1;
            var which = 'y';
        }
        else if (k == Crafty.keys.DOWN_ARROW || k == Crafty.keys.S) {
            var movement = 1;
            var which = 'y';
        }
        else if (k == Crafty.keys.LEFT_ARROW || k == Crafty.keys.A) {
            var movement = -1;
            var which = 'x';
        }
        else if (k == Crafty.keys.RIGHT_ARROW || k == Crafty.keys.D) {
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