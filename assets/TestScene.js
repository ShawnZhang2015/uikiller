let Thor = require('Thor');


const SCENE_INFO = [
    '基础用法：节点、事件绑定',
    '动态创建Prefab',
    '使用“$”绑定同类型节点',
    '插件：过滤器用法，排除节点',
    '插件：多语言绑定用法',
    '插件：音效控制',
    'TouchStart事件的秘密',
    '隐藏节点的绑定测试',
    '节点缩放测试'
];

cc.Class({
    extends: Thor,

    properties: {
        listItem: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
        let games = cc.game._sceneInfos.map((sceneInfo,index) => {
            let name = cc.path.basename(sceneInfo.url, '.fire');
            return { name, title: SCENE_INFO[index] }; 
        }).filter(item => item.name !== 'TestScene');

        games.forEach((item) => {
            let listItem = cc.instantiate(this.listItem);
            listItem.on(cc.Node.EventType.TOUCH_END, () => {
                cc.director.loadScene(item.name);
            });
            listItem.getComponent(cc.Label).string = item.title;
            this._content.addChild(listItem);
        });
        
        
        if (!CC_EDITOR) {
            let backNode = cc.find('back');
            cc.game.addPersistRootNode(backNode);
        }
        
    },

});