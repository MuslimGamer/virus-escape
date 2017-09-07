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

        var playerEntity = Crafty.e("Player").placeInRandomTile();
        map.playerTile = playerEntity.tile;

        map.getRandomTile(true).setWinGate();

        var dangerTilesNo = Game.levelNumber * config('dangerTilesPerLevel');
        for (var i = 0; i < dangerTilesNo; i++) {
            if (config('allowWeakDangerTile') && config('allowStrongDangerTile')) {
                var dangerTile = Srand.choice(['setWeakDangerTile', 'setStrongDangerTile']);
            } 
            else if (config('allowWeakDangerTile')) var dangerTile = 'setWeakDangerTile';
            else if (config('allowStrongDangerTile')) var dangerTile = 'setStrongDangerTile';

            else break;

            map.getRandomTile()[dangerTile]();
        }

        var switchGateNo = Math.floor((Game.levelNumber/2) + 1) * config('switchGatesPerLevel');
        for (var i = 0; i < switchGateNo; i++) {
            var switchGate = map.getRandomTile().setSwitchGate();
            map.getRandomTile().setSwitch(switchGate);
        }

        if (config('limitedMoves')) {
            playerEntity.setMoveCounter(Crafty.e('MoveCounter'));
            playerEntity.setMoveLimit(map.getMoveLimit());
        }

        if (config('playerHealth') > 0) {
            playerEntity.setHealthCounter(Crafty.e('HealthCounter'));
        }
        
        if (config('timerSeconds') > 0) {
            Crafty.e('GameOverTimer').startTimer();
        }

    },

    preStart: function() {
        map.newSeed();
        Game.start();
    },

    completeLevel: function() {
        console.log('Level ' + Game.levelNumber.toString() + ' complete! ' + 
                    'Starting level ' + (Game.levelNumber + 1).toString() + '.');
        Game.levelNumber += 1;
        this.cleanUp();
        this.start();
    },

    loseLevel: function() {
        console.log('You died at level ' + Game.levelNumber.toString() + "!");
        Game.levelNumber = 1;
        this.cleanUp();
        this.preStart();
    },

    cleanUp: function() {
        // copypaste from house of jinn
        var everything = Crafty("*");
        for (var i = 0; i < everything.length; i++) {
            Crafty(everything[i]).destroy();
        }
    }
};

window.addEventListener('load', Game.preStart);
