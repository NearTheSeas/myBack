const Product = require('../models/product');
const utility = require('utility');

exports.detail = (req, res) => {
    Product.getByNumber(req.params.number)
        .then((product) => {
            if (!product) {
                return Promise.reject(new Error('产品不存在'));
            }
            res.json(product);
        }).catch(error => {
            res.render('account/login', { message: error.message });
        });
};

// 产品列表
exports.list = (req, res) => {
    Product.getList()
        .then((products) => {
            res.json(products);
        }).catch(error => {
            res.render('account/login', { message: error.message });
        });
};

// 添加产品
// exports.add = (req, res) => {};