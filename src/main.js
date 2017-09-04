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
        
        Crafty.e("Level").create(Game.levelNumber);

        Crafty.e("Player");
    }
}

window.addEventListener('load', Game.start);
