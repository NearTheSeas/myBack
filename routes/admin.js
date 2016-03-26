const express = require('express');
const router = express.Router();

const User = require('../models/user');
const admin = require('../controllers/admin');

// 判断用户是否登录 是否有权限查看后台
router.use((req, res, next) => {
    // 如果session中有用户信息
    if (req.session.current_user) {
        next();
    } else {
        // cookie中是否存在登录信息
        var cookieUser = req.cookies.uinfo;
        if (!cookieUser) {
            res.redirect('/account/login');
            return;
        }
        User.getByUsername(cookieUser.uid)
            .then((user) => {
                if (!user) {
                    res.clearCookie('uinfo');
                    res.redirect('/account/login');
                }
                if (user.password !== cookieUser.pwd) {

                    res.clearCookie('uinfo');
                    res.redirect('/account/login');
                    return;
                }
                // cookie登录成功
                req.session.current_user = user;
                next();
            })
    }
})

router.get('/', admin.index);

module.exports = router;
