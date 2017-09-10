// AntiVirus: an enemy which moves once for every x(configurable) moves the player does.
Crafty.c('AntiVirus', {
    init: function() {
        this.requires('TileEntity')
            .color('red')
            .bind('AntiVirusMove', this.moving);

        this.nameInTile = 'AntiVirus';
        this.fadingTiles = [];
    },

    moving: function () {
        var path = map.getPathToPlayer(this.tile.x, this.tile.y)[1]; // get first movement
        if (typeof(path) == 'undefined') {
            return;
        }
        var tile = map.getTile(path[0], path[1]); // get tile from map

        if (tile.entity == 'Player') {
            tile.entityView.reduceHealth(config('antiVirusDamage'));
        }

        if (config('antiVirusTailLength') > 0) {
            this.fadingTiles.push(this.tile)
        }
        this.tile.leave(config('walkedTileByAntiVirus'), true);
        
        this.moveTo(tile);

        for (var i = 0; i < this.fadingTiles.length; i++) {
            var tile = this.fadingTiles[i];
            tile.footprintFade++;
            if (tile.footprintFade >= config('antiVirusTailLength')) {
                tile.footprintFade = 0;
                tile.resetTile();

                var index = this.fadingTiles.indexOf(tile);
                this.fadingTiles.splice(index, 1);
            }
        }
    }
});