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

        this.toCleanUp = [];

        Crafty.e("Level").loadMap(map);
        var player = Crafty.e("Player").placeInRandomTile();

        var gate = Crafty.e('Gate').placeInRandomTile();
        
        this.toCleanUp.push(player, gate);
    },

    completeLevel: function() {
        console.log('Level ' + this.levelNumber.toString() + ' complete! ' + 
                    'Starting level ' + (this.levelNumber + 1).toString() + '.');
        this.levelNumber += 1;
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
