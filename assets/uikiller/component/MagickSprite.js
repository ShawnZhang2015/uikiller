let DefaultNameEnum = cc.Enum({ '<None>': 0 });

let MagickSprite = cc.Class({
    extends: cc.Sprite,

    properties: {
        _spriteFrames: [],
        spriteFrames: {
            type: [cc.SpriteFrame],
            set(value) {
                this._spriteFrames = value;
                this._spriteFrames.forEach((spriteFrame) => {
                    if (spriteFrame) {
                        cc.log(spriteFrame._textureFilename);
                    }
                }, this);
                this.spriteFrame = this._spriteFrames[this.index];
                this._nameEnum = null;
                this._refresh();
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
                this._refresh();
                this._index = value % this.spriteFrames.length;
                this.spriteFrame = this._spriteFrames ? this._spriteFrames[this._index] : null;
                if (this.spriteFrame) {
                    this.spriteName = this.spriteFrame.name;
                }
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

        _nameEnum: null,
    },

    getNameEnum() {
        if (this._nameEnum && this._nameEnum.__enums__) {
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

    _refresh() {
        let nameEnum = this.getNameEnum();
        cc.setEnumAttr(this, '_nameIndex',  nameEnum || DefaultNameEnum);
        Editor.Utils.refreshSelectedInspector('node', this.uuid);
    },

   
});

// if (CC_EDITOR) {
//     // override __preload
//     MagickSprite.prototype.__superPreload = cc.Sprite.prototype.__preload;
//     MagickSprite.prototype.__preload = function () {
//         this.__superPreload();
//         this._refresh();
//     };

//     cc.Class.Attr.setClassAttr(MagickSprite, 'spriteFrame', 'visible', false);
// }
