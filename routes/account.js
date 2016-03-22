const express = require('express');
const router = express.Router();
const account = require('../controllers/account');

// 用户登录
router.get('/login', account.login);
router.post('/login', account.loginPost);

// 用户列表
router.get('/list', account.list);

// 验证码
router.get('/captcha.png', account.captcha);

module.exports = router;