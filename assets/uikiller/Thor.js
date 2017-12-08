/**
 * 
 */
let uikiller = require('./uikiller');

 let Thor = cc.Class({
    extends: cc.Component,
    editor: {
        executeInEditMode: true,
    },

    __preload() {
        uikiller.bindComponent(this);    
    },
 });

window.Thor = module.exports = Thor;
