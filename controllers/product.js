const Product = require('../models/product');
const utility = require('utility');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

// 产品详情
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
exports.add = (req, res) => {
    var form = new formidable.IncomingForm();
    // 保留上传文件的扩展名
    form.keepExtensions = true;
    // 限制上传文件的大小
    form.maxFieldSize = 10 * 1024 * 1000;
    // fields: 表单中 文本框的内容  files：上传的文件
    form.parse(req, (err, fields, files) => {
        // 拼接图片路径
        var pic = files.picture ? fields.product_number + path.extname(files['picture'].path) : '';

        var product = Product.create({
                product_number: fields.product_number,
                product_name: fields.product_name,
                product_size: fields.product_size,
                capacity: fields.capacity,
                picture: pic
            }).save()
            .then(product => {
                if (!product) {
                    return Promise.reject(new Error('保存产品失败'));
                }
                if (pic) {
                    var readstrean = fs.createReadStream(files['picture'].path);
                    var writeStream = fs.WriteStream(path.join(__dirname,
                        `../public/uploads/${pic}`));
                    readstrean.pipe(writeStream);
                    fs.unlinkSync(files['poster'].path);
                }
                res.json('product');
            })
            .catch(err => {
                res.send(err);
            });
    })
};
