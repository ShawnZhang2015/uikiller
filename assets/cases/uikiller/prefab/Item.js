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
});
