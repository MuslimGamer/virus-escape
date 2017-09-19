Crafty.c('Button', {
    init: function () {
        this.requires('Actor, Mouse, Text2')
            .color('blue')
            .bind('MouseUp', this.buttonClick);
    },

    buttonClick: function () {
        this.callBack();

        return this;
    },

    setCallBack: function (callBack) {
        this.callBack = callBack;

        return this;
    }
});