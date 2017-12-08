let Thor = require('Thor');

cc.Class({
    extends: Thor,

    properties: {
    
    },

    onLoad: function () {
        cc.log(this.name, ',onLoad');
        this._item1.$Item.string = 'cocos1';
    },

});
