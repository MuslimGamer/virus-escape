// WinGate: the green tile to win the puzzle
Crafty.c('WinGate', {
    init: function() {
        this.requires('TileEntity')
            .color('green');

        this.nameInTile = 'WinGate';
    },

})