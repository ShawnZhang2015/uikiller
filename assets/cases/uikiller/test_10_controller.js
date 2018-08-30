let itemController = require('item_controller');

class Controller {

    _onButtonTouchEnd(sender, touchEvent) {
        itemController.setData({value: Date.now()});
    }
}

module.exports = Controller;