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

cc.setEnumAttr = function(obj, propName, enumDef) {
    cc.Class.attr(obj, propName, {
        type: 'Enum',
        enumList: cc.Enum.getList(enumDef)
    });
};

/**
 * 1.button 控件禁用时同步 node 节点 interactable属性
 * 2.button 控件禁用时,设置子节 sprite 点为灰
 * @type {cc.Button._updateState|*}
 */
const GRAY_SHADER_FRAGMENT = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    varying vec2 v_texCoord;
    void main()
    {
        vec3 v = texture2D(CC_Texture0, v_texCoord).rgb;
        float f = v.r * 0.299 + v.g * 0.587 + v.b * 0.114;
        gl_FragColor = vec4(f, f, f, 1.0);
    }
`
const SPRITE_POSITION_TEXTURE_COLOR_VERT = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    attribute vec4 a_color;
    varying vec2 v_texCoord;
    varying vec4 v_fragmentColor;
    void main()
    {
        gl_Position = CC_PMatrix  * a_position;
        v_fragmentColor = a_color;
        v_texCoord = a_texCoord;
    }
`
let updateState = cc.Button.prototype._updateState;

let grayShader = new cc.GLProgram();
grayShader.initWithString(SPRITE_POSITION_TEXTURE_COLOR_VERT, GRAY_SHADER_FRAGMENT);
grayShader.link();
grayShader.updateUniforms();

cc.Button.prototype._updateState = function () {
    updateState.call(this);
    if (this.node.interactable === this.interactable) {
        return;
    }

    this.node.interactable = this.interactable;
    if (!this.enableAutoGrayEffect || this.transition === cc.Button.Transition.COLOR) {
        return;
    }

    if (this.transition === cc.Button.Transition.SPRITE && this.disabledSprite) {
        return;
    }
    
    this.node.children.forEach((node) => {
        let sprite = node.getComponent(cc.Sprite);
        if (sprite && sprite._sgNode) {
            sprite._sgNode.setState(this.interactable ? 0 : 1);
            return;
        }

        let label = node.getComponent(cc.Label);
        if (label && label._sgNode) {
            if (cc.sys.isNative) {
                var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(grayShader);
                label.node._sgNode.setGLProgramState(grayShader);
            } else {
                // let shaderProgram = this.interactable ?
                // cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLOR) :
                // this._shaderProgram = cc.Scale9Sprite.WebGLRenderCmd._getGrayShaderProgram();
                let shaderProgram = this.node._sgNode.shaderProgram;
                label._sgNode._renderCmd.setShaderProgram(shaderProgram);
            }
        }
    });
};