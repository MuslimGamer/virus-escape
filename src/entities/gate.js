// Gate: the gate to win the puzzle
Crafty.c('Gate', {
    init: function() {
        this.requires('Tiled')
            .size(32, 32)
            .color('green');

        this.nameInTile = 'WinGate';
    },

})