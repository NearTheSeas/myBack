const Shelf = require('../models/shelf');

exports.detail = (req, res) => {
    Shelf.getByNumber(req.params.number)
        .then((shelf) => {
            if (!shelf) {
                return Promise.reject(new Error('货架不存在'));
            }
            res.json(shelf);
        }).catch(error => {
            res.render('error/404', { message: error.message });
        });
};

// 仓位列表
exports.list = (req, res) => {
    Shelf.getList()
        .then((shelfs) => {
            res.json(shelfs);
        }).catch(error => {
            console.log(err);
            res.send(err);
        });
};
