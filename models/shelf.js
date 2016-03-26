const db = require('./db');

//　product构造函数
function Shelf(id, shelf_number, status) {
    this.id = id;
    this.shelf_number = shelf_number || '';
    this.status = status || true;
}
// ==================================== 静态方法 ====================================================
// 将数据库查询出来的rowdata对象 转为Product对象
Shelf.create = (obj) => {
    if (!obj) {
        return null;
    }
    return new Shelf(obj.id, obj.shelf_number, obj.status);
};

// 根据产品内部编码查找
Shelf.getByNumber = (number) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM shelfs WHERE shelf_number = '${number}'`)
        .then((result) => {
            var shelf = shelf.create(result[0]);
            resolve(shelf);
        })
        .catch(reject);
});

// 获取仓位列表
Shelf.getList = () => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM shelfs`)
        .then((results) => {
            var shelfs = [];
            results.forEach((shelf) => {
                var shelf = Shelf.create(shelf);
                shelfs.push(shelf);
            });
            resolve(shelfs);
        })
        .catch(reject);
});

module.exports = Shelf;
