const Code = require('../models/code');

// 物流码
exports.detail = (req, res) => {
    Code.getByNumber(req.params.number)
        .then((code) => {
            if (!code) {
                return Promise.reject(new Error('物流码不存在'));
            }
            return code.getChild();
        })
        .then((code) => {
            if (req.query.callback) {
                res.jsonp(code);
            } else {
                res.json(code);
            }
        })
        .catch(error => {
            res.render('error/404', { message: error.message });
        });
};

// 物流码列表
exports.list = (req, res) => {
    Code.getList()
        .then((codes) => {
            res.json(codes);
        }).catch(error => {
            console.log(err);
            res.send(err);
        });
};
