let Thor = require('Thor');

cc.Class({
    extends: Thor,

    properties: {
    
    },

    onLoad: function () {
        cc.log(this.name, ',onLoad');
        this._item1.$Item.string = '显示这个';
        this.scheduleOnce(() => {
            this._item1.active = true;
        }, 2);
    },

});
