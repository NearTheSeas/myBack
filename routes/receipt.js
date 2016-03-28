const express = require('express');
const router = express.Router();
const receipt = require('../controllers/receipt');

// 入库单列表
router.get('/list', receipt.list);

// 新增入库单
router.post('/add', receipt.add);

module.exports = router;
