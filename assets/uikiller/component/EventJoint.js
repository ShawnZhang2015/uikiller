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
        let value =  this.senderPath ? _.get(object, this.senderPath) : undefined;
        let handle = _.get(this.node, this.handlePath);

        //value是函数
        if (_.isFunction(value)){
            let strKeyThis = this.keyPath.substr(0, this.keyPath.lastIndexOf('.'));     
            let keyThis = _.get(this.node, strKeyThis);
            value = value.call(keyThis); 
        }
        
        //取handle
        if (_.isFunction(handle)) {
            let strThis = this.handlePath.substr(0, this.handlePath.lastIndexOf('.'));     
            let handleThis = _.get(this.node, strThis);
            handle.call(handleThis, value);     
        } else {
            _.set(this.node, this.handlePath, value);
        }
    }
});
