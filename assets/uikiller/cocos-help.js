/**
 * Created by ShawnZhang on 2017/9/3.
 */

/**
 * 通过资源实例化预制对象
 * @param res   资源字符串
 * @param cb    回调函数返回
 */
cc.createPrefab = function(res, cb) {
    cc.loader.loadRes(res, cc.Prefab, (error, prefab) => {
        let node = null;
        if (error) {
            cc.error(`createPrefab ${error}`);
        } else {
            node = cc.instantiate(prefab);
        }
        
        if (cb) {
            cb(error, node);
        }
    });  
}

/**
 * 通过资源路径（预制）创建节点, 根据 sender 类型并完成节点挂接
 * @param sender
 * @param res
 * @param cb
 */
cc.Component.prototype.createNode = function(sender, res, cb) {
    cc.log(`createNode ${res}`);
    cc.createPrefab(res, (error, node) => {
        if (sender instanceof cc.Node) {
            sender.addChild(node);
        } else if (this.node && this.node instanceof cc.Node) {
            this.node.addChild(node, 0);
        }
        
        if (cb) {
            cb(node);
        }
    });
};

/**
 * 删除组件上的节点
 */
cc.Component.prototype.destroyNode = function() {
    if (!this.node) {
        return;
    }
    this.node.destroy();
};

/**
 * 节点上是否存在某些组件
 */
cc.Node.prototype.hasComponent = function (types) {
    if (!Array.isArray(types)) {
        types = [types];
    }

    let component = types.find(type => this.getComponent(type));
    return !!component;
};

/**
 * 获取精灵上的纹理文件名
 * @returns {*}
 */
cc.Sprite.prototype.getTextureFilename = function() {
    if (this.spriteFrame) {
        let fileName = this.spriteFrame._textureFilename;
        const index = fileName.indexOf('resources/');
        return fileName.substr(index + 10);
    }
    return '';
};

/**
 * 获取图集中的 spriteFrame， 图集需要预先加载
 * @param atlas
 * @param key
 * @returns {*}
 */
cc.getSpriteFrameByAtlas = function getFrameByAtlas(atlas, key) {
    let path = cc.path.mainFileName(atlas);
    let spriteAtlas = cc.loader.getRes(path, cc.SpriteAtlas);
    if (spriteAtlas) {
        return spriteAtlas.getSpriteFrame(key);
    }
    return null;
};

cc.createNodeComponent = function (componentType) {
    let node = new cc.Node();
    let component = node.addComponent(componentType);
    return component;
};

cc.Component.prototype.loadScene = function (sender, name, cb) {
    cc.director.loadScene(name, cb);
};