let uikiller = require('uikiller');

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad() {
        uikiller.bindComponent(this);
        this.schedule(() => {
            this._magickSprite.$MagickSprite.index++;
            this._sheep.$MagickSprite.index++;
        },0.1);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
