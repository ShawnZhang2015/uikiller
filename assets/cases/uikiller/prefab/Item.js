let Thor = require('Thor');

cc.Class({
    extends: Thor,

    properties: {
        string: {
            default: '',
            notify() {
                this._label.$Label.string = this.string;
            }
        }
    },

    // use this for initialization
    onLoad: function () {
        cc.log(this.node.name);
    },

    //绑定控件器
    bindController() {
        if (this.useController && this.controllerName) {
            let controller = require(this.controllerName);
            controller.onRegister(this);
        }
    },
});
