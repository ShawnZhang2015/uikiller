
cc.Class({
    extends: Thor,

    properties: {
        
    },

    _onButtonTouchEnd() {
        this._item1.y -= 10;
        this._item2.y -= 10;
        this._item3.y -= 10;
    }
});
