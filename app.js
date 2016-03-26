const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const hbs = require('hbs');

const app = express();

// 处理静态文件
app.use(express.static('public'));

//  处理请求
app.use(bodyParser.urlencoded({ extend: true }));

//  设置视图
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cookieParser());

app.use(session({
    secret: 'suibianxied'
}));

// 默认访问管理员首页
const admin = require('./routes/admin');
app.use('/admin', admin);

// 账户相关：登录、查看、添加等
const account = require('./routes/account');
app.use('/account', account);

// 产品相关
const product = require('./routes/product');
app.use('/product', product);

// 仓位相关
const position = require('./routes/position');
app.use('/position', position);

// 货架相关
const shelf = require('./routes/shelf');
app.use('/shelf', shelf);

// 入库单
const receipt = require('./routes/receipt');
app.use('/receipt', receipt);

module.exports = app;
if (!module.parent) {
    app.listen(3000, function() { console.log(`server is ready @ http://localhost:3000`) });
}
