const User = require('../models/user');
const utility = require('utility');
// 验证码
const ccap = require('ccap');

// 登录
exports.login = (req, res) => {
    res.render('account/login', { layout: "" });
};

exports.loginPost = (req, res) => {
    // 验证码判断
    if (req.body.captcha.toUpperCase() !== req.session.captcha) {
        res.render('account/login', { message: '验证码错误' });
        return;
    }
    User.getByUsername(req.body.username)
        .then((user) => {
            if (!user) {
                return Promise.reject(new Error('用户名或密码错误！'));
            }
            if (user.password !== (req.body.password)) {
                return Promise.reject(new Error('用户名或密码错误！'));
            }
            // 用户选择了记住我，将用户的登录信息以键值对的方式保存在 cookie中，并设置过期时间为7天
            if (req.body.remember) {
                res.cookie('uinfo', {
                    uid: req.body.username,
                    pwd: req.body.password
                }, { expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) })
            }
            req.session.current_user = user;
            res.redirect('/admin/');
        }).catch(error => {
            res.render('account/login', { message: error.message });
        });
};

// 验证码
exports.captcha = (req, res) => {
    var captcha = ccap({
        width: 256,
        height: 60,
        offset: 40,
        quality: 100
    });
    var arr = captcha.get();
    var text = arr[0];
    // session中保存验证码的文本
    req.session.captcha = text;
    var buffer = arr[1];
    res.type('imgage/png');
    res.send(buffer);
};

// 用户列表
exports.list = (req, res) => {
    User.getList()
        .then((users) => {
            res.json(users);
        }).catch(error => {
            res.render('account/login', { message: error.message });
        });
};

// 添加用户
exports.add = (req, res) => {

};