const express = require('express');
const router = express.Router();
const shelf = require('../controllers/shelf');

// 产品列表
router.get('/list', shelf.list);

module.exports = router;
