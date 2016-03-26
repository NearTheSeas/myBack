const db = require('./db');

//　product构造函数
function Position(id, position_number, status) {
    this.id = id;
    this.position_number = position_number || '';
    this.status = status || true;
}
// ==================================== 静态方法 ====================================================
// 将数据库查询出来的rowdata对象 转为Product对象
Position.create = (obj) => {
    if (!obj) {
        return null;
    }
    return new Position(obj.id, obj.position_number, obj.status);
};

// 根据产品内部编码查找
Position.getByNumber = (number) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM positions WHERE position_number = '${number}'`)
        .then((result) => {
            var position = Position.create(result[0]);
            resolve(position);
        })
        .catch(reject);
});

// 获取仓位列表
Position.getList = () => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM positions`)
        .then((results) => {
            var positions = [];
            results.forEach((position) => {
                var position = Position.create(position);
                positions.push(position);
            });
            resolve(positions);
        })
        .catch(reject);
});


module.exports = Position;
