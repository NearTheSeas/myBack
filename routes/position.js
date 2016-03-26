const express = require('express');
const router = express.Router();
const position = require('../controllers/position');

// 用户列表
router.get('/list', position.list);

module.exports = router;
