Game = {
    view: {
        // full-screen
        width: window.innerWidth,
        height: window.innerHeight
    },

    levelNumber: 1,

    titleScreen: function () {
        // Game world is whatever fits on-screen
        Crafty.init(Game.view.width, Game.view.height);
        Crafty.background('black');

        // set resources folders
        Crafty.paths({ audio: 'resources/sounds/' });
        var loadingPercent = Crafty.e('Text2');

        loadingPercent.move(Game.view.width / 2, Game.view.height / 2)
                      .textColor('white')
                      .text('Loading... 0%');

        Crafty.load({
            "audio": {
                'death': 'death.wav',
                'win': 'levelComplete.wav',
                'switchActivate': 'lock.wav',
                'hurt': 'hurt.wav'
            }
        }, function () {
            loadingPercent.die();

            var z = 2;

            Crafty.e('Actor, TitleScreen')
                  .size(Game.view.width, Game.view.height)
                  .color('black')
                  .z = z;

            function newGameCallBack() {
                Crafty('TitleScreen').each(function () {
                    this.tween({ alpha: 0.0 }, 500);
                });
                Game.preStart();
                this.after(1, function () {
                    Crafty('TitleScreen').each(function () {
                        this.die();
                    });
                });
            }

            function tutorialCallBack() {
                Crafty('TitleScreen').each(function () {
                    this.tween({ alpha: 0.0 }, 500);
                });
                Game.tutorial();
            }

            Crafty.e('Button, TitleScreen')
                  .setCallBack(newGameCallBack)
                  .size(config('buttonWidth'), config('buttonHeight'))
                  .text('Start game')
                  .move(Game.view.width / 2, Game.view.height / 2)
                  .z = z;

            Crafty.e('Button, TitleScreen')
                  .setCallBack(tutorialCallBack)
                  .size(config('buttonWidth'), config('buttonHeight'))
                  .text('Tutorial')
                  .move(Game.view.width / 2, Game.view.height / 2 + config('buttonHeight') + config('padding'))
                  .z = z;
        }, function (e) {
            loadingPercent.text("Loading... " + e.percent + "%");
        });
    },

    tutorial: function () {
        Crafty.e('Actor, Tutorial')
              .move(Game.view.width / 16, Game.view.height / 16)
              .color('grey')
              .size(Game.view.width / 1.2, Game.view.height / 1.2);
    },

    start: function () {

        function isInArray(array, x, y) {
            for (i = 0; i < array.length; i++) {
                var p = array[i];
                if (p[0] == x && p[1] == y) {
                    return true;
                }
            }
            return false;
        }

        function removeAllInstancesFromArray(array, x, y) {
            while (isInArray(array, x, y)) {
                for (var i = 0; i < array.length; i++) {
                var coords = array[i];
                if (coords[0] == x && coords[1] == y) {
                    array.splice(i, 1);
                    break;
                }
            }
            }
        }
        
        map.init(config("level").widthInTiles, config("level").heightInTiles);
        Crafty.e("Level").loadMap(map);

        var path = [];
        var startTile = null;
        var exit = map.getRandomTile();

        for (i = 0; i < config('pathSegments'); i++) {
            if (startTile == null) {
                startTile = exit;
            }
            var stopTile = map.getRandomTile(exit);
            path = path.concat(map.getPath(startTile, stopTile));
            startTile = stopTile;
        }

        var generator = new Srand(map.seededGen.random());

        exit.setWinGate();
        map.winGate = exit;

        var playerEntity = Crafty.e('Player').moveTo(stopTile);
        map.playerTile = playerEntity.tile;

        var randomTileChance = config('probabilityOfSpawningTile') + config('incrementProbabilityPerLevel') * Game.levelNumber;
        if (randomTileChance > config('maxProbability')) {
            randomTileChance = config('maxProbability');
        }

        var antiVirusNumber = 0;
        for (var x = 0; x < map.widthInTiles; x++) {
            for (var y = 0; y < map.heightInTiles; y++) {
                if (!isInArray(path, x, y) && generator.random() < randomTileChance) {
                    var tile = map.getTile(x, y);
                    if (tile.contents == '' && tile.entity == '') {
                        var choice = generator.choice(['StrongDangerTile', 'WeakDangerTile', 'Empty', 'Empty', 'WallTile', 'WallTile', 'AntiVirus']);
                        switch (choice) {
                            case 'StrongDangerTile':
                                tile.setStrongDangerTile();
                                break;
                            case 'WeakDangerTile':
                                tile.setWeakDangerTile();
                                break;
                            case 'AntiVirus':
                                antiVirusNumber++;
                                if (antiVirusNumber >= 2) {
                                    Crafty.e('AntiVirus').moveTo(tile);
                                    antiVirusNumber = 0;
                                }
                                break;
                            case 'WallTile':
                                tile.setWallTile();
                                break;
                            case 'Empty':
                                break;
                        }
                    }
                }
            }
        }
        
        removeAllInstancesFromArray(path, exit.x, exit.y);

        for (i = 0; i < path.length; i++) {
            var coords = path[i];
            var tile = map.getTile(coords[0], coords[1]);
            tile.resetTile();
        }

        var pathToExit = map.getPathToPlayer(exit);

        removeAllInstancesFromArray(pathToExit, exit.x, exit.y);

        var tile = generator.choice(pathToExit);
        tile = map.getTile(tile[0], tile[1]);

        if (map.getPathToPlayer(exit).length > 0) {
            tile.contents = 'PLACEHOLDER';
            var switchTile = map.getReachableTile();
            if (switchTile == null || map.getPathToPlayer(switchTile).length == 0) {
                tile.resetTile();
            } else {
                tile.setSwitchGate();
                switchTile.setSwitch(tile);
            }
        }

        var dangerTilesNo = Math.floor(Game.levelNumber * config('dangerTilesPerLevel'));
        for (var i = 0; i < dangerTilesNo; i++) {
            if (config('allowWeakDangerTile') && config('allowInvincibleDangerTile')) {
                var dangerTile = generator.choice(['setWeakDangerTile', 'setStrongDangerTile']);
            } else if (config('allowWeakDangerTile')) {
                var dangerTile = 'setWeakDangerTile';
            } else if (config('allowInvincibleDangerTile')) {
                var dangerTile = 'setStrongDangerTile';
            } else {
                break;
            }
            map.getRandomTile()[dangerTile]();
        }

        var switchGateNo = Math.floor(Game.levelNumber/2 + 1) * config('switchGatesPerLevel');
        for (var i = 0; i < switchGateNo; i++) {
            var switchGate = map.getRandomTile().setSwitchGate(i);
            map.getRandomTile().setSwitch(switchGate);
        }

        var numWallTiles = Math.floor(Game.levelNumber * config('wallTilesPerLevel'));
        for (var i = 0; i < numWallTiles; i++) {
            map.getRandomTile().setWallTile();
        }

        if (config('limitedMoves')) {
            playerEntity.setMoveCounter(Crafty.e('MoveCounter'));
            playerEntity.setMoveLimit(map.getMoveLimit());
        }

        if (config('playerHealth') > 0) {
            playerEntity.setHealthCounter(Crafty.e('HealthCounter'));
        }

        if (config('allowAntiVirusEntities')) {
            var numAntiViruses = Math.floor(Game.levelNumber * config('antiVirusesPerLevel'));
            for (i = 0; i < numAntiViruses; i++) {
                Crafty.e('AntiVirus').placeInRandomTile();
            }
        }

        if (config('timerSeconds') > 0) {
            Crafty.e('GameOverTimer').startTimer();
        }

    },

    preStart: function () {
        map.newSeed();
        Game.start();
    },

    completeLevel: function () {
        Crafty.audio.play('win');
        console.log('Level ' + Game.levelNumber.toString() + ' complete! ' +
                    'Starting level ' + (Game.levelNumber + 1).toString() + '.');
        Game.levelNumber += 1;
        this.cleanUp();
        this.start();
    },

    loseLevel: function () {
        Crafty.audio.play('death');
        console.log('You died at level ' + Game.levelNumber.toString() + "!");
        Game.levelNumber = 1;
        this.cleanUp();
        this.preStart();
    },

    cleanUp: function() {
        // copypaste from house of jinn
        var everything = Crafty("*");
        for (var i = 0; i < everything.length; i++) {
            Crafty(everything[i]).die();
        }
    }
};

window.addEventListener('load', Game.titleScreen);
