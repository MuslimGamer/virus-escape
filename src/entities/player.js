Crafty.c('Player', {
    init: function() {
        // TileEntity already requires Actor
        this.requires("TileEntity, Controllable")
            .color('white')
            .bind('KeyDown', this.moving);

        this.bind('PlayerMoved', this.moved);
        
        this.nameInTile = 'Player';
    },

    moved: function(newTile) {
        var tileType = newTile.tileData.contents;
        var entity = newTile.tileData.entity;

        if (tileType == 'WinGate') {
            Game.completeLevel()
        } else if (tileType == 'DangerTile' || 
                   tileType == 'SwitchGate' && entity.isOn == true) {
            Game.loseLevel()
        } else if (tileType == 'Switch' && entity.isOn == true) { 
            // the entity is the switch tile and it's not activated yet.
            entity.activate()
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
        var y = this.tile.tileData.y;
        var x = this.tile.tileData.x;

        if (which == 'y') {
            y += movement;
        } else {
            x += movement;
        }

        var newTile = map.getTile(x, y);
        
        if (newTile == null || newTile.tileData.walkable == false) {
            return;
        }
        Crafty.trigger('PlayerMoved', newTile);

        // handle removing player from tile's contents array
        this.tile.tileData.leave();
        this.moveTo(newTile);
    }
});