// AntiVirus: an enemy which moves once for every x(configurable) moves the player does.
Crafty.c('AntiVirus', {
    init: function() {
        this.requires('TileEntity')
            .color('red');

        this.nameInTile = 'AntiVirus';
    },

    moving: function () {
        if (config('antiviruRandomMovements')) {
            var isTileEmpty = false;
            var choices = ['up', 'down', 'left', 'right'];

            while (!isTileEmpty && choices.length > 0) {
                var direction = Srand.choice(choices);
                var x = this.tile.x;
                var y = this.tile.y;
                switch (direction) {
                    case 'up':
                        y++;
                        break;
                    case 'down':
                        y--;
                        break;
                    case 'left':
                        x--;
                        break;
                    case 'right':
                        x++;
                        break;
                }
                var tile = map.getTile(x, y);
                choices.splice(choices.indexOf(direction), 1);
                if (typeof (tile) != 'undefined') {
                    isTileEmpty = tile.contents == '' && tile.entity != 'AntiVirus';
                }
            }
            if (!isTileEmpty) {
                return;
            }
        } else {
            var path = map.getPathToPlayer(this.tile)[1]; // get first movement
            if (typeof (path) == 'undefined') {
                return null;
            }
            var tile = map.getTile(path[0], path[1]); // get tile from map
        }

        if (tile.entity == 'AntiVirus') {
            return null;
        }

        if (config('antiVirusTailLength') > 0) {
            returnTile = tile;
        }
        this.tile.leave(config('walkedTileByAntiVirus'), true);
        
        this.moveTo(tile);

        if (config('antiVirusTailLength') > 0) {
            return returnTile;
        }
    }
});