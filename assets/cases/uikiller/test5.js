let uikiller = require('uikiller');

cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: true,
        //executionOrder: -1,
    },

    __preload() {
        uikiller.bindComponent(this);    
    },

    properties: {
      
    },

    // use this for initialization
    onLoad() {
        //uikiller.bindComponent(this);       
    },




    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
