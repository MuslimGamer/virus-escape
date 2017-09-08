Crafty.c('Player', {
    init: function() {
        // TileEntity already requires Actor
        this.requires("TileEntity, Controllable")
            .color('white')
            .bind('KeyDown', this.moving);

        this.bind('PlayerMoved', this.moved);
        
        this.nameInTile = 'Player';

        this.health = config('playerHealth');
    },

    moved: function(newTile) {
        var tileType = newTile.contents;

        if (tileType == 'WinGate') {
            Game.completeLevel();
        } else if (tileType == 'WeakDangerTile') {
            this.health -= config('dangerDamage');
            this.healthCounter.setHealth(this.health);

            if (this.health <= 0) {
                Game.loseLevel();
            }
        } 

        else if (tileType == 'StrongDangerTile') {
            Game.loseLevel();
        } else if (tileType == 'Switch' && newTile.isOn == true) { 
            newTile.activate();
        }

        if (config('limitedMoves')) {
            this.moves -= 1;
            if (this.moves < 0) {
                Game.loseLevel();
            }
            this.moveCounter.setMoves(this.moves);
        }
    },

    setMoveCounter: function(moveCounter) {
        this.moveCounter = moveCounter;
        
        return this;
    },

    setHealthCounter: function(healthCounter) {
        this.healthCounter = healthCounter;
        this.healthCounter.setHealth(this.health);
    },

    setMoveLimit: function(moveLimit) {
        this.moves = moveLimit + config('extraMoves');
        this.moveCounter.setMoves(this.moves);

        return this;
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
        var y = this.tile.y;
        var x = this.tile.x;

        if (which == 'y') {
            y += movement;
        } else {
            x += movement;
        }

        var newTile = map.getTile(x, y);
        
        if (newTile == null || newTile.contents == 'WallTile' || newTile == this.tile) {
            return;
        }
        Crafty.trigger('PlayerMoved', newTile);

        // handle removing player from tile's contents array
        this.tile.leave();
        this.moveTo(newTile);
    }
});