cc.Class({
    extends: Thor,

    properties: {
       
    },

    getOptions() {
        return {
            filter: (node) => {
                return node.$ % 2;
            }     
        }
    },
    // use this for initialization
    onLoad: function () {
       
        for (let i = 1; i <= 8; i++) {
            let imageNode = this[`_image${i}`];
            if (imageNode.num) {
                imageNode.num.getComponent(cc.Label).string = i;        
            }
        }
    },
});
