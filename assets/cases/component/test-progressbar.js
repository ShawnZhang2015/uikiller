let uikiller = require('uikiller');

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0.001,
    },

    // use this for initialization
    onLoad() {
        uikiller.bindComponent(this);
        
    },

    update() {
        for(let i = 1; i < 10; i++) {
            let bar = this[`_bar${i}`];
            if (bar) {
                let progress = bar.$ProgressBar.progress;
                bar.$ProgressBar.progress = progress >= 1 ? 0 : progress + this.speed;
            } else {
                break;
            }

        }
    }
});
