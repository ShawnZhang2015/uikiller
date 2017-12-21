
cc.Class({
    extends: Thor,

    properties: {
    },
   
    random(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    
    _onButtonTouchEnd(sender) {
        this._log.$Label.string = `你点击了${sender.$}`;
        this._number.$Label.string += sender.$;
        let i = this.random(8, 1);
        let button = this[`_button${i}`];
        let pt = this._stencil.parent.convertToNodeSpaceAR(button.parent.convertToWorldSpaceAR(button.position));
        this._stencil.position = pt;
    },
    
    _onMaskTouchStart(sender, event) {
        let pt = this._stencil.convertToNodeSpace(event.getLocation());
        let rect = cc.rect(0, 0, this._stencil.width, this._stencil.height);

        //点中空洞，返回false,触摸事件继续派发
        if (cc.rectContainsPoint(rect, pt)) {
            return false; 
        }
        this._log.$Label.string = `点击区域无效`;
        this._log.runAction(cc.blink(1, 6));
    }
});
