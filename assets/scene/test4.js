let uikiller = require('uikiller');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        uikiller.bindComponent(this, {filter: (node) => {
            return node.$ % 2;
        }});
        for (let i = 1; i <= 8; i++) {
            let imageNode = this[`_image${i}`];
            if (imageNode.num) {
                imageNode.num.getComponent(cc.Label).string = i;        
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
