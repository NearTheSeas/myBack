const Position = require('../models/position');

// 仓位详情
exports.detail = (req, res) => {
    Position.getByNumber(req.params.number)
        .then((position) => {
            if (!position) {
                return Promise.reject(new Error('仓位 u不存在'));
            }
            res.json(position);
        }).catch(error => {
            res.render('position/list', { message: error.message });
        });
};

// 仓位列表
exports.list = (req, res) => {
    Position.getList()
        .then((positions) => {
            res.json(positions);
        }).catch(error => {
            console.log(err);
            res.send(err);
        });

    // res.send('positionList');
};
