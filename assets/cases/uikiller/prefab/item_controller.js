
let controller = {
    views: [],
    name: 'item_controller',

    onRegister(item) {
        this.views.push(item);
        item.string = '0';
    },

    setData(data) {
        this.views.forEach(item => {
            item.string = data.value;
        });
    }
}

module.exports = controller;