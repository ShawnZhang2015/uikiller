let Thor = require('Thor');

cc.Class({
    extends: Thor,

    properties: {
       
    },

    // use this for initialization
    onLoad: function () {
        for(let i = 1; i <= 8; i++) {
            let name = '_image' + i;
            let node = this[name];
            //节点下的节点用Name就可以访问，但是Label没“_”开头，不能用$访问节点下的组件
            node.num.getComponent(cc.Label).string = i;
        }
    },

    _onImageTouchEnd(sender) {
        this._logLabel.$Label.string = `你点击了${sender.$}，他的节点名字为"${sender.name}"`;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
