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
        var tileType = newTile.contents;
        var entity = newTile.entity;

        if (tileType == 'WinGate') {
            Game.completeLevel()
        } else if (tileType == 'DangerTile' || 
                   (tileType == 'SwitchGate' && entity.isOn == true)) {
            Game.loseLevel()
        } else if (tileType == 'Switch' && entity.isOn == true) { 
            // the entity is the switch tile and it's not activated yet.
            entity.activate()
        }
    },

    moving: function(e) {
        var k = e.key;

        switch(k){
            case Crafty.keys.UP_ARROW:
            case Crafty.keys.W:
                this.velocity(-1,-2);
            break;

            case Crafty.keys.DOWN_ARROW:
            case Crafty.keys.S:
                this.velocity(-1,2);
            break;

            case Crafty.keys.LEFT_ARROW:
            case Crafty.keys.A:
                this.velocity(-3,-0);
            break;

            case Crafty.keys.RIGHT_ARROW:
            case Crafty.keys.D:
                this.velocity(1,0);
            break;

            default:


        }

     /*  if (k == Crafty.keys.UP_ARROW || k == Crafty.keys.W) {
            var movement = -1;
            var which = 'y';
        }
        else if (k ==  || k == ) {
            var movement = 1;
            var which = 'y';
        }
        else if (k == Crafty.keys. || k == Crafty.keys.A) {
            var movement = -1;
            var which = 'x';
        }
        else if (k == Crafty.keys. || k == Crafty.keys.D) {
            var movement = 1;
            var which = 'x';
        } else {
            return;
        }
        var y = this.tile.y;
        var x = this.tile.x;

        if (which == 'y') {
            y += movement;
        } else {
            x += movement;
        }

        var newTile = map.getTile(x, y);
        
        if (newTile == null || newTile.walkable == false) {
            return;
        }
        Crafty.trigger('PlayerMoved', newTile);

        // handle removing player from tile's contents array
        this.tile.leave();
        this.moveTo(newTile); */
    }
});