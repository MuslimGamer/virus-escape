// GameOverTimer: the configurable time limit for completing the level.
Crafty.c('GameOverTimer', {
    init: function() {
        this.requires('Delay, Canvas, Text')
            .textColor('white')
            .textFont({size: '20px'});
    },

    timerTick: function() {
        this.timerSeconds -= 1;
        this.text(this.timerSeconds.toString());
    },

    startTimer: function() {
        this.timerSeconds = config('timerSeconds');
        if (this.timerSeconds == 0) {
            return this;
        }
        this.text(this.timerSeconds.toString());
        this.delay(this.timerTick, 1000, this.timerSeconds, function() {Game.loseLevel();});

        return this;
    }
})