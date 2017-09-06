// GameOverTimer: the configurable time limit for completing the level.
Crafty.c('GameOverTimer', {
    init: function() {
        this.requires('Common, Canvas, Text')
            .textColor('white')
            .textFont({size: '20px'});
    },

    timerTick: function() {
        this.timerSeconds -= 1;
        if (this.timerSeconds < 0) {
            Game.loseLevel();
        }
        this.text(this.timerSeconds.toString());
    },

    startTimer: function() {
        this.timerSeconds = config('timerSeconds');
        this.text(this.timerSeconds.toString());
        this.repeatedly(this.timerTick, 1);

        return this;
    }
})