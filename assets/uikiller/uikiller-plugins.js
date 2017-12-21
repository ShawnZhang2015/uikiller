let uikiller = require('./uikiller');
const UIKillerBindFilter = {
    name: 'UIKillerBindFilter',
    onCheckNode(node, target) {
        if (node === target.node) {
            return true;
        }

        let options = target.$options;
        if (uikiller.isFunction(options.filter)) {
            if (options.filter(node)) {
                return false;
            }
        }

        if (node.name[0] === '@') {
            return false;
        }
    }
};

const LANGUAGE_TABLE = {
    hello: '你好XXX',
    world: '世界',
    '1': 'hello',
    '2': 'wrold',
}
const UIKillerLabelLanguage = {  
    name: 'UIKillerLabelLanguage',
    onCheckNode(node, target) {
        let label = node.getComponent(cc.Label);
        if (!label) {
            return;
        }
        let key = node.$ || node.name;
        let str = LANGUAGE_TABLE[key];
        if (str) {
            label.string = str;
        }
    }
};

const SOUND_CONFIG = {
    _attack: '3002.mp3',
    _expedition: '3006.mp3', 
    click: 'click.mp3',      
}
const UIKillerTouchSound = {
    name:'UIKillerTouchSound',
    /**
     * 
     * @param {*} node 
     * @param {*} event 
     * @param {*} hasEventFunc 
     * @param {*} eventResult 
     */
    onAfterHandleEvent(node, event, hasEventFunc, eventResult) {
        if (event.type !== cc.Node.EventType.TOUCH_END || eventResult === false) {
            return;
        }
        
        let soundName = SOUND_CONFIG[eventResult] || SOUND_CONFIG[node.name] || SOUND_CONFIG.click;
        let url = cc.url.raw(`resources/sound/${soundName}`);
        cc.audioEngine.play(url);
    }
};

uikiller.registerPlugin(UIKillerBindFilter);
uikiller.registerPlugin(UIKillerLabelLanguage);
uikiller.registerPlugin(UIKillerTouchSound);