const express = require('express');
const router = express.Router();
const product = require('../controllers/product');

// 产品列表
router.get('/list', product.list);

// 产品详情 @number：要查询的产品编码
router.get('/detail/:number', product.detail);

// 添加产品
router.post('/add', product.add);

module.exports = router;
