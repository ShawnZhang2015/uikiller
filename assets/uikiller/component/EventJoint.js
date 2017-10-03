/**
 * 事件连接器
 */

let EventJoint = cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: true,
    },

    properties: {
        //事件发送者
        sender: {
            type: cc.Node,
            default: null,
        },
        isBind: true,
        //监听事件    
        senderEvent: '',
        //名字
        senderPath: '',
        //handle
        handlePath: '',
    },

    onEnable: function () {
        if (this._init || !this.sender || !this.senderEvent) {
            return;
        }

        if (uikiller) {
            uikiller.bindComponent(this);
        }
        
        this._init = true;
        this.sender.on(this.senderEvent, this.jointEvent, this);
    },

    jointEvent(event) {
        let object = event.detail ? event.detail : event.target;
        let key = this.senderPath || this.handlePath;
        let value = _.get(object, key);
        try{
            _.set(this.node, this.handlePath, value);    
        } catch(e) {
            cc.log(e);
        }
    }
});
