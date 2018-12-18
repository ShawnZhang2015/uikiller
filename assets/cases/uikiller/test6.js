cc.Class({
    extends: Thor,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this._button3.tagIndex = 0;  
    },

    _onAttackTouchEnd() {
        this._log.$Label.string = '你点击了战斗';    
    },

    _onExpeditionTouchEnd() {
        this._log.$Label.string = '你点击了出征';    
    },

    _onRandomTouchEnd() {
        let config = ['_attack', '_expedition', false];
        let i = this._button3.tagIndex++ % 3;
        this._log.$Label.string = `你点击了随机, touchEnd返回值：${config[i]}`;
        
        return config[i];   
    },

    _onButton3TouchEnd() {
        this._log.$Label.string = `你点击了普通按钮3, 我是不会发声的`;
        return false;
    },

    testButton() {
    }
});
