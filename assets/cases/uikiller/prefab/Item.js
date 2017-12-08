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

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
