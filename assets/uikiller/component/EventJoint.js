let uikiller = require('uikiller');

let EventJointItem = cc.Class({
    name: 'EventJointItem',

    properties: {
        sender: cc.Node,
        senderEventType: '',
        key: '',
        recverHandle: '',
    }
});


cc.Class({
    extends: cc.Component,

    properties: {
        events: [EventJointItem],
    },

    // use this for initialization
    onEnable: function () {
    
        if (this._init) {
            return;
        }

        uikiller.bindComponent(this, { touchEvent: false });

        this._init = true;
        this.events.forEach((element) => {
            element.sender.on(element.senderEventType, (event) => {
                //取值
                let value;
                let key = element.key || element.recverHandle;
                if (event.detail) {
                    value = _.get(event.detail, key);
                } else {
                    value = _.get(event.target, key);
                }
                

                //检查组件\节点上是否存在handle
                let node = null;
                let handle = _.get(this, element.recverHandle);
                if (handle === undefined) {
                    node = this.node;
                    handle = node[element.recverHandle];
                    if (handle === undefined) {
                        return;        
                    }
                }

                if (typeof handle === 'function') {
                    handle.call(node || this, value);
                } else {
                    _.set(node || this, element.recverHandle, value);
                }
            });

        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
