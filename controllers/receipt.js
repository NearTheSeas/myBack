const Receipt = require('../models/receipt');

exports.detail = (req, res) => {
    Receipt.getByNumber(req.params.number)
        .then((receipt) => {
            if (!receipt) {
                return Promise.reject(new Error('出错了'));
            }
            res.json(receipt);
        }).catch(error => {
            res.render('error/404', { message: error.message });
        });
};

// 仓位列表
exports.list = (req, res) => {
    Receipt.getList()
        .then((receipts) => {
            res.json(receipts);
        }).catch(error => {
            res.render('error/404', { message: error.message });
        });
};
