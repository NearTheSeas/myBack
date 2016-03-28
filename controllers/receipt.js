const Receipt = require('../models/receipt');

exports.add = (req, res) => {
    console.log(req.body);
    // console.log(req.query);
    res.send('添加访问成功');
};

// 入库单列表
exports.list = (req, res) => {
    Receipt.getList()
        .then((receipts) => {
            res.json(receipts);
        }).catch(error => {
            res.render('error/404', { message: error.message });
        });
};
