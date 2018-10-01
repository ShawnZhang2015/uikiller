# 快速上手指南
uikiller是使用名命规则来控制UI节点、组件和触摸事件，减少UI相关的代码与编辑器设置，实现原理是提前对UI树的遍历。
在CocosCreator中UI编程基于组件模式，我根据自己的项目经验，将组件分为两类：**功能型**与**控制型**。

#### 功能型组件
>功能型组件：以装饰宿主节点为己任，从不控制其它节点。

特点：通用性强，可挂载任意节点，Creator内置的组件绝大多数属于这类。
举例：Sprite、Label、Button、Widget等。

#### 控制型组件
>控制型组件：管理和控制其它节点及节点上的组件，通常会根据上层业务要求，调用其它节点的属性方法完成任务。

特点：业务逻辑性强，通用性差。
举例：完成具体业务功能的自定义组件。

关于功能型和控制型组件的探索可以参考我的另一篇文章[《CocosCreator组件化编程的探索》](https://www.jianshu.com/p/c1e13fb513b3)

有了上面的了解，我将uikiller定位为区域的管理者，下面介绍一下uikiller的基本用法。

# 一、Thor组件
Thor组件继承自cc.Component，同时封装了uikiller的组件绑定能力，提供了当前UI树的直接访问控制能力。
```
//导入Thor组件
let Thor = require('Thor');
cc.Class({
    extends: Thor,  //继承Thor组件
    onLoad() {
    }
});
```
使用uikiller提供的Thor组件做为自定组件的基类，并挂载到场景或预制体的**根节点上**，该组件脚本即可拥有控制UI树的两大能力：**节点访问**与**触摸事件监听**。

# 二、节点访问

在Thor子类脚本中，可直访问整个UI树中以下划线“_”开头命名的节点。

![节点名命名](http://upload-images.jianshu.io/upload_images/2489070-fe6d37fe1611a0e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
let Thor = require('Thor');
cc.Class({
    extends: Thor,
    properties: {
    },
    onLoad() {
        //直接访问节点
        cc.log(this._image.name);
        cc.log(this._label.name);
        cc.log(this._button.name);
    },
});
```

# 三、组件访问
在node节点访问的基础上，使用“$” + “组件名”访问节点上挂载的组件对象。
```
let Thor = require('Thor');
cc.Class({
    extends: Thor,
    properties: {
    },
    onLoad() {
        //在节点上使用“$组件名”访问组件
        this._label.$Label.string = 'hello world';
       
        //注意继承了Thor的子类，onLoad函数在编辑器状态就会被执行，可以根据具体业务使用CC_EDITOR变量逻辑判定是否要在编辑状态时间
        if (!CC_EDITOR) {
            //禁用按钮
            this._disableBtn.$Button.interactable = false;
        }
    },
});
```

# 三、触摸事件监听
下划线“_”开头的节点可以自动关联其触摸事件。

##### 目前支持五个触摸事件：
>TouchStart、TouchMove、TouchEnd、TouchCancel、TouchLong

### 命名规则
>**_on** + 控件名(去下划线，首字母大写) + **触摸事件**

例如节点名为_label，事件函数为：_onLabelTouchEnd
为什么定义这样的命名规则呢?首先“___”开头表示私有，on表示事件，后面形成形成驼峰命名，以具体触摸事件为后缀。

## 1. 监听节点事件
```
let Thor = require('Thor');
cc.Class({
    extends: Thor,
    /*
    *sender 响应事件的节点
    *event  事件对象，可以从中获取触摸坐标点等信息
    */
    _onLabelTouchEnd(sender, event) {
        cc.assert(sender === this._label);
        sender.$Label.string = '你抚摸了我';    
    }
```
## 2. 节点触摸事件监听
上面讲的都是子节点的触摸事件监听，如果要组件监听当前节点(this.node)如何操作呢？
###命名规则
>**_on** +  **触摸事件**(首字母大写，形成驼峰命名)

同样支持五个事件：TouchStart、TouchMove、TouchEnd、TouchCancel、TouchLong
```
let Thor = require('Thor');
cc.Class({
    extends: Thor,

    //监听当前节点的触摸事件
    _onTouchStart(sender) {
        cc.assert(this.node === sender);
    }
})
```
## 3. 长按事件监听
长按事件是uikill扩展的触摸事件类型，可以给节点设置touchLongTime属性控制长按触发时间，默认是1秒，注意以毫秒为单位。
```
let Thor = require('Thor');

cc.Class({
    extends: Thor,

    properties: {
    },

    // use this for initialization
    onLoad() {
        this._label.touchLongTime = 500;
    },

    _onLabelTouchLong(sender) {
        cc.assert(sender === this._label);
    },
```


## 关注**奎特尔星球**微信公众号，获取最新动态！

![奎特尔星球](https://github.com/ShawnZhang2015/uikiller/raw/master/WeChat-Official-Accounts.jpg)