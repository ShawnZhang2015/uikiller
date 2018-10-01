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
        debug: false,
    },

    __preload() {
        this.bindHammer();
    },

    getOptions() {
        return {
            debug: this.debug
        }
    },

    bindHammer() {
        if (this._bindHammer) {
            return;
        }
        this._bindHammer = true;
        
        let start = Date.now();
        let options = this.getOptions();
        
        uikiller.bindComponent(this, options);
        if (this.debugInfo) {
            let duration = Date.now() - start;
            cc.log(`bindComponent ${this.node.name} duration ${duration}`);
        }
    }
});

window.Thor = module.exports = Thor;
