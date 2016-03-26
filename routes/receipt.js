const express = require('express');
const router = express.Router();
const receipt = require('../controllers/receipt');

// 产品列表
router.get('/list', receipt.list);

module.exports = router;
