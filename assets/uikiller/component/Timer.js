/**
 * uikiller component
 */

let Timer = cc.Class({
    extends: cc.Component,

    properties: {
        interval: {
            default: 1,  
            range: [0, 99999],  
        },
        _duration: 0,
    },

    statics: {
        TIMER_EVENT: 'timer-event',
    },

    update(dt) {
        
        this._duration += dt;
        if (this._duration >= this.interval) {
            this.emit(this.TIMER_EVENT, this);
        }
    },
});