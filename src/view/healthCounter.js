// HealthCounter: displays the Health left.
Crafty.c('HealthCounter', {
    init: function() {
        this.requires('Text2')
            .textColor('white')
            .move(130, 0);
    },

    setHealth: function(healthLeft) {
        this.text('Health: ' + healthLeft);
        return this;
    }
});