Crafty.c('Button', {
    init: function () {
        this.requires('Actor, Mouse, Text2')
            .color('blue')
            .bind('MouseUp', this.buttonClick);
    },

    callBack: function () { },

    buttonClick: function () {
        this.callBack();

        return this;
    },

    setCallBack: function (callBack) {
        this.callBack = callBack;

        return this;
    }
});