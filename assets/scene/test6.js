let uikiller = require('uikiller');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        uikiller.bindComponent(this); 
        this._button3.tag = 0;  
    },

    _onAttackTouchEnd() {
        this._log.$Label.string = '你点击了战斗';    
    },

    _onExpeditionTouchEnd() {
        this._log.$Label.string = '你点击了出征';    
    },

    _onRandomTouchEnd() {
        let i = this._button3.tag++ % 3;
        let config = ['_attack', '_expedition', false];
        this._log.$Label.string = `你点击了随机, touchEnd返回值：${config[i]}`;
        return config[i];   
    },

    _onButton3TouchEnd() {
        this._log.$Label.string = `你点击了普通按钮3, 我是不会发声的`;
        return false;
    },

    testButton() {
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
