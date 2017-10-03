/**
 * 事件连接器
 */
let events = [
    //触摸事件
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'mousedown',
    'mousemove',
    'mouseenter',
    'mouseleave',
    'mouseup',
    'mousewheel',
    //node事件
    'group-changed',
    'position-changed',
    'size-changed',
    'anchor-changed',
    'rotation-changed',
    'scale-changed',
    'child-reorder',
    'spriteframe-changed',
    //editbox
    'editing-did-began',
    'editing-did-ended',
    'text-changed',
    'editing-return',
    //animation
    'play',
    'stop',
    'pause',
    'resume',
    'lastframe',
    'finished',
];

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
        //isBind: true,
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

        //如果有uikiller，进行绑定
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
