Crafty.c('Player', {
    init: function() {
        var self = this;

        this.requires("Actor")
            .size(32, 32)
            .color('white');
    }
});