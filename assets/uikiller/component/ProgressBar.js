/**
 * ProgressBar
 * 使用cc.Sprite的fillType实现的进度条控件
 */

let ProgressBar = cc.Class({
    extends: cc.Sprite,

    properties: {
            progress:{
            default: 1,
            type: 'Float',
            range: [0, 1, 0.1],
            slide: true,
            notify: function() {
                this._updateBarStatus();
            },
            serializable: true,
        },

        style:{
            type:cc.Sprite.FillType,
            default: cc.Sprite.FillType.HORIZONTAL,
            notify: function() {
                this._updateBarStatus();
            }
        },

        reverse: {
            default: false,
            notify: function() {
                this._updateBarStatus();
            },
        },
    },

    // use this for initialization
    onLoad: function () {
        this.type = cc.Sprite.Type.FILLED;
        this._updateBarStatus();
    },

    _init: function() {
        switch (this.style) {
            case cc.Sprite.FillType.HORIZONTAL:
                this.fillType = cc.Sprite.FillType.HORIZONTAL;
                this.fillRange = this.reverse ? 0 : 1
                this.fillStart = this.reverse ? 1 : 0;
                break;
            case cc.Sprite.FillType.VERTICAL:
                this.fillType = cc.Sprite.FillType.VERTICAL;
                this.fillRange = this.reverse ? 0 : 1
                this.fillStart = this.reverse ? 1 : 0;
                break;
            case cc.Sprite.FillType.RADIAL:
                this.fillType = cc.Sprite.FillType.RADIAL;
                this.fillCenter = cc.p(0.5, 0.5);
                this.fillStart = 0.25;
                this.fillRange = 1
                break;  
        }
    },

    _updateBarStatus: function(){
        this._init(); 
        if (this.style === cc.Sprite.FillType.RADIAL) {
            this.fillRange = this.reverse ? this.progress : -this.progress;    
        } else {
            this.fillRange = this.reverse ? -this.progress : this.progress;    
        }
    }
});

cc.Class.Attr.setClassAttr(ProgressBar, 'type', 'visible', false);
cc.Class.Attr.setClassAttr(ProgressBar, 'fillType', 'visible', false);
cc.Class.Attr.setClassAttr(ProgressBar, 'fillCenter', 'visible', false);
cc.Class.Attr.setClassAttr(ProgressBar, 'fillStart', 'visible', false);
cc.Class.Attr.setClassAttr(ProgressBar, 'fillRange', 'visible', false);
cc.Class.Attr.setClassAttr(ProgressBar, 'srcBlendFactor', 'visible', false);
cc.Class.Attr.setClassAttr(ProgressBar, 'dstBlendFactor', 'visible', false);