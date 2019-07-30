let Thor = require('Thor');


const SCENE_INFO = {
    test1: '基础用法：节点、事件绑定',
    test2: '动态创建Prefab',
    test3: '使用“$”绑定同类型节点',
    test4: '插件：过滤器用法，排除节点',
    test5: '插件：多语言绑定用法',
    test6: '插件：音效控制',
    test7: 'TouchStart事件的秘密',
    test8: '隐藏节点的绑定测试',
    test9: '节点缩放测试',
    test10: '控制器',
};

cc.Class({
    extends: Thor,

    properties: {
        listItem: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        
        let games = cc.game._sceneInfos.map((sceneInfo,index) => {
            let name = cc.path.basename(sceneInfo.url, '.fire');
            return { name, title: SCENE_INFO[name] || name }; 
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