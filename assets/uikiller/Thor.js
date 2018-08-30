/**
 * 
 */
let uikiller = require('./uikiller');

 let Thor = cc.Class({
    extends: cc.Component,
    editor: {
        executeInEditMode: true,
    },

    properties: {
        useController: false,
        controllerName: ''
    },

    __preload() {
        this._bindHammer = false;
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
        
        let start = Date.now();
        let options = this.getOptions();
        
        uikiller.bindComponent(this, options);
        if (!CC_EDITOR) {
            this._bindHammer = true;
        }

        //关联逻辑控制器
        // if (this.useController && this.controllerName) {
        //     let Controller = require(this.controllerName);
        //     this.$controller = new Controller();
        //     uikiller.bindNode(this.node, this.$controller);
        // }
        this.bindController();

        if (CC_DEBUG) {
            let duration = Date.now() - start;
            cc.log(`bindComponent ${this.node.name} duration ${duration}`);
        }
    },

    bindController() {
         //关联逻辑控制器
         if (this.useController && this.controllerName) {
            let Controller = require(this.controllerName);
            this.$controller = new Controller();
            uikiller.bindNode(this.node, this.$controller);
        }   
    }
});

window.Thor = module.exports = Thor;
