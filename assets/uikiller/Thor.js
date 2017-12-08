/**
 * 
 */
let uikiller = require('./uikiller');

 let Thor = cc.Class({
    extends: cc.Component,
    editor: {
        executeInEditMode: true,
    },

    properties:{
        _bindHammer: false,
    },

    __preload() {
        this.bindHammer();
    },

    bindHammer() {
        if (this._bindHammer) {
            return;
        }
        this._bindHammer = true;
        uikiller.bindComponent(this);
    }

});

window.Thor = module.exports = Thor;
