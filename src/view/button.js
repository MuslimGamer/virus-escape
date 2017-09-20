Crafty.c('TitleScreenButton', {
    init: function () {
        this.requires('Actor, Mouse, Text2')
            .color('blue')
            .bind('MouseUp', this.buttonClick);
    },

    callBack: function () {},

    buttonClick: function () {
        var allTitleEntities = Crafty('TitleScreen');
        for (i = 0; i < allTitleEntities.length; i++) {
            var entity = Crafty(allTitleEntities[i]);
            entity.tween({ alpha: 0.0 }, 500);
        }
        this.after(1, this.cleanTitle);
        this.callBack();

        return this;
    },

    cleanTitle: function () {
        var allTitleEntities = Crafty('TitleScreen');
        for (i = 0; i < allTitleEntities.length; i++) {
            Crafty(allTitleEntities[i]).die();
        }
    },

    setCallBack: function (callBack) {
        this.callBack = callBack;

        return this;
    }
});