// DangerTile: the red blocks you should stay away from
Crafty.c('DangerTile', {
    init: function() {
        this.requires('TileEntity')
            .color('red');

        this.nameInTile = 'DangerTile';
    }
})