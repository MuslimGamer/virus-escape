// AntiVirus: an enemy which moves once for every x(configurable) moves the player does.
Crafty.c('AntiVirus', {
    init: function() {
        this.requires('TileEntity')
            .color('red')
            .bind('AntiVirusMove', this.moving);

        this.nameInTile = 'AntiVirus';
    },

    moving: function() {
        var path = map.getPathToPlayer(this.tile.x, this.tile.y)[1]; // get first movement
        if (typeof(path) == 'undefined') {
            return;
        }
        var tile = map.getTile(path[0], path[1]); // get tile from map

        if (tile.entity == 'Player') {
            tile.entityView.reduceHealth(config('antiVirusDamage'));
        }

        this.tile.leave(config('walkedTileByAntiVirus'));
        this.moveTo(tile);
    }
});