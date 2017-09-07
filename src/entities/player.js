Crafty.c('Player', {
    init: function() {
        // TileEntity already requires Actor
        this.requires("TileEntity, Controllable")
            .color('white')
            .bind('KeyDown', this.moving);

        this.velocity(1,0);           //Initial player movement
        //this.bind('PlayerMoved', this.moved);
        this.nameInTile = 'Player';
        this.collide('Tile',        this.interact)
        this.collide('DangerTile',  Game.loseLevel)      //Touch danger object - Lose
        this.collide('WinGate',     Game.completeLevel)     //Touch wingate - Win
      //  this.collide('Switch', entity.activate)

    },

    interact: function(data, test, test2, test3){
        if(data[0].type =="SAT"){console.log(data[0])}
        for(i = 0; i<data.length;i++)
        {
            tile = data[i].obj
            switch(tile.type){
                case '':                              //Player moved to a new tile. It will not be safe here for long. 
                    tile.setType('warning')
                break;
                case 'warning':                             //Time based trigger already in place, nothing more to process on collision.                  
                break;
                case 'danger':                              //Player has wandered in sight of Anti-virus. Game over.
                 //   game.loseLevel();
                break;
                case 'trigger':                             //Player has reached a config file. Time to take control.
                    tile.setType('trigger-closed')
                break;
                case 'trigger-closed':                      //This file has been infected by player already. Nothing more to do. 
                    //this.color('')
                break;
                case 'gate':                                //Player has attempted to access a locked file system. Instantly alerts anti-virus, game over. 
                 //   game.loseLevel();
                break; 
            }
        }
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