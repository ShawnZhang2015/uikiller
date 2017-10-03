
let NodeEventEnum = cc.Enum({
    'touchstart': -1,
    'touchmove': -1,
    'touchend': -1,
    'touchcancel': -1,
    'mousedown': -1,
    'mousemove': -1,
    'mouseenter': -1,
    'mouseleave': -1,
    'mouseup': -1,
    'mousewheel': -1,
    'group-changed': -1,
    'position-changed': -1,
    'size-changed': -1,
    'anchor-changed': -1,
    'rotation-changed': -1,
    'scale-changed': -1,
    'child-reorder': -1,
});

let SpriteEventEnum = cc.Enum({
    'spriteframe-changed': -1,  
});

let EditBoxEventEnum = cc.Enum({
    'editing-did-began': -1,
    'editing-did-ended': -1,
    'text-changed': -1,
    'editing-return': -1,
});

let AnimationEventEnum = cc.Enum({
    'play': -1,
    'stop': -1,
    'pause': -1,
    'resume': -1,
    'lastframe': -1,
    'finished': -1,
});


let DefaultNodeEnum = cc.Enum({ node: -1 });
let DefaultHandleEnum = cc.Enum({ '-': 0 });

function setEnumAttr (obj, propName, enumDef) {
    cc.Class.attr(obj, propName, {
        type: 'Enum',
        enumList: cc.Enum.getList(enumDef)
    });
};

//枚举节点上的组件（含节点）
function getNodeComponentEnum(node, excludes) {
    if (!node) {
        return;
    }
    let index = 0;
    let array = [].concat(node, node._components);
    if (excludes) {
        array = array.filter(object => excludes.indexOf(object) === -1);
    }
   
    let obj = {};
    array.forEach((object) => {
        let name = object instanceof cc.Node ? 'node' : object.__classname__;//object.name.match(/<.*>$/)[0].slice(1, -1);
        obj[name] = -1;
        index++;
    });
    
    if (index) {
        return cc.Enum(obj);
    }
}


function getObjectAttrEnum(node, objectName) {
    let object = objectName === 'node' ? node : node.getComponent(objectName);
    let obj = {};
    let index = 0;

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
            obj[propName] = -1;
            index++;
        }
    }
    if (index) {
        return cc.Enum(obj);
    }
}

let EventJoint = cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: true,
    },

    properties: {
        //节点
        watchNode: {
            type: cc.Node,
            default: null,
            notify() {
                //this._refreshSender();
            },
        },

        selfObjectName: {
            default: 'node',
            visible: false,
        },

        _selfObjectIndex: {
            type: DefaultNodeEnum,
            visible: true,
            displayName: 'selfObject',
            get() {
                let objectEnum = this._getSelfObjectEnum() || DefaultNodeEnum;
                return objectEnum[this.selfObjectName];
            },

            set(value) {
                let objectEnum = this._getSelfObjectEnum() || DefaultNodeEnum;
                this.selfObjectName = objectEnum[value];
                if (CC_EDITOR) {
                    this._handleEnum = null;
                    this._refreshHandle();
                }
                
            }
        },

        handleName: {
            default: '',
            visible: false,    
        },

        _handleNameIndex: {
            type: DefaultHandleEnum,
            visible: true,
            displayName: 'handleName',
            set(value) {
                let handleEnum = this._getHandleEnum() || DefaultHandleEnum;
                this.handleName = objectEnum[value];
            },

            get() {
                let handleEnum = this._getHandleEnum() || DefaultHandleEnum;
                return handleEnum[this.handleName] || 0;
            }
        },
    },

    _getHandleEnum() {
        if (!this._handleEnum) {
            this._handleEnum = getObjectAttrEnum(this.node, this.selfObjectName);
            if (CC_EDITOR) {
                setEnumAttr(this, '_handleNameIndex', this._handleEnum  || DefaultNodeEnum);
                setTimeout(() => {
                    Editor.Utils.refreshSelectedInspector('node', this.uuid);   
                });
                  
            }
        }
     
        return this._handleEnum;
    },

    _getSelfObjectEnum() {
        if (this._selfObjectEnum) {
            return this._selfObjectEnum;
        }
        return this._selfObjectEnum = getNodeComponentEnum(this.node, [this]);
    },

    _refreshSelf() {
        if (CC_EDITOR) {
            this._selfObjectEnum = getNodeComponentEnum(this.node, [this]);
            setEnumAttr(this, '_selfObjectIndex', this._selfObjectEnum  || DefaultNodeEnum);
            Editor.Utils.refreshSelectedInspector('node', this.uuid);
        }
    },

    _refreshHandle() {
        // if (CC_EDITOR) {
        //     this._handleEnum = getObjectAttrEnum(this.node, this.selfObjectName);
        //     setEnumAttr(this, '_handleNameIndex', this._handleEnum  || DefaultHandleEnum);
        //     Editor.Utils.refreshSelectedInspector('node', this.uuid);
        // }
    },

    __preload: CC_EDITOR && function() {
        this._refreshSelf();
        this._refreshHandle();
    },

    // _getSelfHanleEnum() {
    //     if (this._selfHandleEnum) {
    //         return this._selfHandleEnum;
    //     }

    //     let obj = {};
    //     let index = 0;
    //     let array = [].concat(this.node, this.node._components);
    //     array.forEach((object) => {
    //         if (object === this || !object.name) {
    //             return;
    //         }

    //         let name = object instanceof cc.Node ? 'node' : object.name.match(/<.*>$/)[0].slice(1, -1);
    //         let props = object.constructor.__props__;
    //         let attrs = cc.Class.Attr.getClassAttrs(object.constructor);
            
    //         for (let p = 0; p < props.length; p++) {
    //             let propName = props[p];
    //             let visible = attrs[propName + cc.Class.Attr.DELIMETER + 'visible'];
    //             console.log(`${propName}${cc.Class.Attr.DELIMETER}${visible}`)
    //             if (visible !== false) {
    //                 //屏蔽name
    //                 if (propName === 'name') {
    //                     continue;
    //                 }
    //                 obj[`${name}.${propName}`] = -1;    
    //                 this._handleEnumImpl[index] = {
    //                     target: object,
    //                     key: propName,    
    //                 };
    //                 index++;
    //             }
    //         }
    //     });
       
    //     if (index) {
    //         return this._handleEnum = cc.Enum(obj);
    //     }
    // },

    // //刷新 
    // _refreshSelf() {
    //     let handleEnum = this._getSelfHanleEnum();
    //     setEnumAttr(this, '_handleIndex', handleEnum || DefaultHandleEnum);
    //     Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
    // },

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
