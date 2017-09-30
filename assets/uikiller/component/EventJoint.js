var DefaultHandleEnum = cc.Enum({ '<None>': 0 });

function setEnumAttr (obj, propName, enumDef) {
    cc.Class.attr(obj, propName, {
        type: 'Enum',
        enumList: cc.Enum.getList(enumDef)
    });
}

let EventJoint = cc.Class({
    extends: cc.Component,

    properties: {
        //事件发送者
        sender: {
            type: cc.Node,
            default: null,
            notify() {
                this._refresh();
            },
        },
        //事件类型
        senderEventType: '',

        //要读取的属性
        senderKey: '',

        //处理函数或属性
        handle: {
            default: '',
            visible: false,
        },


        _handleIndex: {
            type: DefaultHandleEnum,
            visible: true,
            displayName: 'handle',
            get() {
                //let animationName = (!CC_EDITOR || cc.engine.isPlaying) ? this.handle : '';
                let hanleEnum = this._getHanleEnum() || DefaultHandleEnum;
                return hanleEnum[this.handle] || 0;
            },
            set(value) {
                let hanleEnum = this._getHanleEnum();
                this.handle = hanleEnum[value];
            },
        },

        custom: {
            type: cc.Boolean,
            default: false,
            notify() {
                cc.Class.Attr.setClassAttr(this, '_handleIndex', 'visible', !this.custom);
                cc.Class.Attr.setClassAttr(this, 'handle', 'visible', this.custom);
            }
        },

    

        _handleEnum: null,
        _handleEnumImpl: null,
    },

    _getHanleEnum() {
        if (!this.sender) {
            return;
        }
        if (this._handleEnum) {
            return this._handleEnum;
        }
        this._handleEnumImpl = {};

        let obj = {};
        let index = 0;
        let array = [].concat(this.node, this.node._components);
        array.forEach((object) => {
            if (object === this || !object.name) {
                return;
            }

            let name = object instanceof cc.Node ? 'node' : object.name.match(/<.*>$/)[0].slice(1, -1);
            let props = object.constructor.__props__;
            let attrs = cc.Class.Attr.getClassAttrs(object.constructor);
            
            for (let p = 0; p < props.length; p++) {
                let propName = props[p];
                let visible = attrs[propName + cc.Class.Attr.DELIMETER + 'visible'];
                console.log(`${propName}${cc.Class.Attr.DELIMETER}${visible}`)
                if (visible !== false) {
                    //屏蔽name
                    if (propName === 'name') {
                        continue;
                    }
                    obj[`${name}.${propName}`] = -1;    
                    this._handleEnumImpl[index] = {
                        target: object,
                        key: propName,    
                    };
                    index++;
                }
            }
        });
       
        if (index) {
            return this._handleEnum = cc.Enum(obj);
        }
    },

    //刷新 
    _refresh() {
        if (!this.sender) {
            this._handleEnum = null;
        }

        let handleEnum = this._getHanleEnum();
        setEnumAttr(this, '_handleIndex', handleEnum || DefaultHandleEnum);
        Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
    },

    // use this for initialization
    onEnable: function () {
        if (this._init || !this.sender) {
            return;
        }

        this._init = true;
       
        this.sender.on(this.senderEventType, this.jointEvent, this);
     
    },

    jointEvent(event) {
        let value;
        let key;
        if (!this.custom) {
            let handleObject = this._handleEnumImpl[this._handleIndex];
            key = this.senderKey || handleObject.key;
            if (event.detail) {
                value = _.get(event.detail, key);
            } else {
                value = _.get(event.target, key);
            }

            //检查组件\节点上是否存在handle
            try{
                cc.log(handleObject.key, value);
                _.set(handleObject.target, handleObject.key, value);    
            } catch(e) {
            
            }
        } else {
            let handleObject = this._handleEnumImpl[this._handleIndex];
            key = this.senderKey || handleObject.key;
            if (event.detail) {
                value = _.get(event.detail, key);
            } else {
                value = _.get(event.target, key);
            }

            //检查组件\节点上是否存在handle
            try{
                cc.log(handleObject.key, value);
                _.set(handleObject.target, handleObject.key, value);    
            } catch(e) {
            
            }    
        }
        
    }
});
