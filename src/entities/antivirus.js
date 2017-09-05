// AntiVirus: the red blocks you should stay away from
Crafty.c('AntiVirus', {
    init: function() {
        this.requires('Tiled')
            .size(32, 32)
            .color('red');

        this.nameInTile = 'AntiVirus';
    }
})