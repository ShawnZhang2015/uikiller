let DefaultNameEnum = cc.Enum({ '<None>': 0 });

//模拟多语言key
let config = {
    'sheep0': '45f08588-b32b-4d25-811d-19984af2da21',
    'sheep1': 'be53e572-17eb-4703-84e3-9048f248c4c4',
    'sheep2': "8dfea58d-2cec-49f6-ab34-2057096563f1",
}


function setEnumAttr (obj, propName, enumDef) {
    cc.Class.attr(obj, propName, {
        type: 'Enum',
        enumList: cc.Enum.getList(enumDef)
    });
}

let MagickSprite = cc.Class({
    extends: cc.Sprite,

    properties: {
        _spriteFrames: [],
        spriteFrames: {
            type: [cc.SpriteFrame],
            set(value) {
                this._spriteFrames = value;
                this._nameEnum = null;
            },

            get() {
                return this._spriteFrames;
            },
        },

        _index: 0,
        index: {
            type: cc.Integer,
            range: [0, 10],
            set(value) {
                if (value === this._index || value > this._spriteFrames.length) {
                    return;
                }
            
                this._index = value % this.spriteFrames.length;
                this.spriteFrame = this._spriteFrames ? this._spriteFrames[this._index] : null;
                if (this.spriteFrame) {
                    this.spriteName = this.spriteFrame.name;
                }
                CC_EDITOR && this._refresh();
            },

            get() {
                return this._index;
            }
        },

        spriteName: {
            default: '',
            visible: false,
        },

        _nameIndex: {
            type: DefaultNameEnum,
            visible: true,
            displayName: 'spriteName',
            get() {
               return this._index;
            },

            set(value) {
                this.index = value;
            }
        },

        language: {
            default: '',
            notify(oldValue) {
                if (this.language === oldValue) {
                    return;
                }
                let uuid = config[this.language];
                if (!uuid) {
                    cc.log('not find langage value');
                    return;    
                }
                this._updateSpriteFrame(uuid);
            },
        },

        _nameEnum: null,
    },

    getNameEnum() {
        if (this._nameEnum) {
            return this._nameEnum;
        }

        let obj = {};
        this._spriteFrames.forEach((spriteFrame, index) => {
            if (spriteFrame) {
                obj[spriteFrame.name] = -1;
            }
        
        });
        return this._nameEnum = cc.Enum(obj);
    },

    _updateSpriteFrame(uuid) {
        cc.loader.load({ uuid }, (error, spriteFrame) => {
            this.spriteFrame = spriteFrame;
        })
    },

    _refresh() {
        let nameEnum = this.getNameEnum();
        setEnumAttr(this, '_nameIndex',  nameEnum || DefaultNameEnum);
        Editor.Utils.refreshSelectedInspector('node', this.uuid);
    },

    __preload: CC_EDITOR && function() {
        this._super();
        this._refresh();
    },

    next() {
        this.index = this._index + 1;
    }
   
});

cc.Class.Attr.setClassAttr(MagickSprite, 'spriteFrame', 'visible', false);
cc.Class.Attr.setClassAttr(MagickSprite, '_atlas', 'visible', false);
cc.Class.Attr.setClassAttr(MagickSprite, 'fillCenter', 'visible', function() {
    return this._type === cc.Sprite.Type.FILLED;
});
cc.Class.Attr.setClassAttr(MagickSprite, 'fillStart', 'visible', function() {
    return this._type === cc.Sprite.Type.FILLED;
});
cc.Class.Attr.setClassAttr(MagickSprite, 'fillEnd', 'visible', function() {
    return this._type === cc.Sprite.Type.FILLED;
});
cc.Class.Attr.setClassAttr(MagickSprite, 'fillRange', 'visible', function() {
    return this._type === cc.Sprite.Type.FILLED;
});

cc.Class.Attr.setClassAttr(MagickSprite, 'srcBlendFactor', 'visible', function() {
    return this._type === cc.Sprite.Type.FILLED;
});
cc.Class.Attr.setClassAttr(MagickSprite, 'dstBlendFactor', 'visible', function() {
    return this._type === cc.Sprite.Type.FILLED;
});