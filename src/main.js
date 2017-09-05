Game = {
    view: {
        // full-screen
        width: window.innerWidth,
        height: window.innerHeight
    },

    levelNumber: 1,

    start: function() {
        // Game world is whatever fits on-screen
        Crafty.init(Game.view.width, Game.view.height);
        Crafty.background('black');
        
        map.init(config("level").widthInTiles, config("level").heightInTiles);

        Crafty.e("Level").loadMap(map);
        Crafty.e("Player").placeInRandomTile();

        Crafty.e('WinGate').placeInRandomTile();

        for (var i = 0; i < Game.levelNumber; i++) {
            Crafty.e('DangerTile').placeInRandomTile();
        }

        var switchGateNo = Math.floor((Game.levelNumber/2) + 1)

        for (var i = 0; i < switchGateNo; i++) {
            var switchGate = Crafty.e('SwitchGate').placeInRandomTile();
            Crafty.e('Switch').placeInRandomTile()
                              .addSwitchGate(switchGate);
        }

        Crafty.e('Timer').startTimer();
    },

    completeLevel: function() {
        console.log('Level ' + Game.levelNumber.toString() + ' complete! ' + 
                    'Starting level ' + (Game.levelNumber + 1).toString() + '.');
        Game.levelNumber += 1;
        this.cleanUp();
        this.start();
    },

    loseLevel: function() {
        console.log('You died at level ' + Game.levelNumber.toString() + "!")
        Game.levelNumber = 1;
        this.cleanUp();
        this.start();
    },

    cleanUp: function() {
        // copypaste from house of jinn
        var everything = Crafty("*");
        for (var i = 0; i < everything.length; i++) {
            Crafty(everything[i]).destroy();
        }
    }
};

window.addEventListener('load', Game.start);
