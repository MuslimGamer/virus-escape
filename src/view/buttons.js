Crafty.c('Button', {
    init: function () {
        this.requires('Actor, Mouse, Text2')
            .color('blue')
            .bind('MouseUp', this.buttonClick);
    },

    callBack: function () { },
    preCallBack: function () { },

    buttonClick: function () {
        this.preCallBack();
        this.callBack();

        return this;
    },

    setCallBack: function (callBack) {
        this.callBack = callBack;

        return this;
    },

    setPreCallBack: function (callBack) {
        this.preCallBack = callBack;

        return this;
    }
});

Crafty.c('NewGameButton', {
    init: function () {
        this.requires('Button');

        this.setPreCallBack(function () {
            Crafty('TitleScreen').each(function () {
                this.tween({ alpha: 0.0 }, 500);
            });
            this.after(1, this.cleanTitle);
        });
    },

    cleanTitle: function () {
        Crafty('TitleScreen').each(function () {
            this.die();
        });
    }
})