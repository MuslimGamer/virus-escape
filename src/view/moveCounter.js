// MoveCounter: displays the moves left.
Crafty.c('MoveCounter', {
    init: function() {
        this.requires('Text2')
            .textColor('white')
            .move(30, 0);
    },

    setMoves: function(movesLeft) {
        this.text('Moves: ' + movesLeft);
        return this;
    }
});