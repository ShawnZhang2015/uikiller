/**
 * uikiller component
 */

let TimerEventParam = cc.Class({
    name: 'TimerEventParam',
    properties: {
        id: '',
        interval: {
            default: 0,  
            range: [0, 99999],  
        },
        _duration: 0, 
    }
});

let Timer = cc.Class({
    extends: cc.Component,

    properties: {
        eventParams: [TimerEventParam],
    },

    statics: {
        TIMER_EVENT: 'timer-event',
    },

    onEnable() {
        this.eventParams.forEach((eventParam) => {
            this.schedule(() => {
                this.node.emit(`${Timer.TIMER_EVENT}-${eventParam.id}`, eventParam);
            }, eventParam.interval);
        });
    },

    onDisable() {
        this.unscheduleAllCallbacks();    
    },
});