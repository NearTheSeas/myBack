const db = require('./db');

//　receipt构造函数
function Receipt(id, receipt_number, receipt_date, maker, team, product_date, product_number, shelf_number, counts, position_number, status) {
    this.id = id;
    this.receipt_number = receipt_number;
    this.receipt_date = receipt_date || "";
    this.maker = maker || "";
    this.team = team || "";
    this.product_date = product_date || "";
    this.product_number = product_number || "";
    this.shelf_number = shelf_number || "";
    this.counts = counts || "";
    this.position_number = position_number || "";
    this.status = status || true;

}
// ==================================== 静态方法 ====================================================
// 将数据库查询出来的rowdata对象 转为receipt对象
Receipt.create = (obj) => {
    if (!obj) {
        return null;
    }
    return new receipt(obj.id, obj.receipt_number, obj.receipt_date, obj.maker, obj.team, obj.product_date, obj.product_number, obj.shelf_number, obj.counts, obj.position_number, obj.status);
};

// 根据入库单内部编码查找
Receipt.getByReceiptNumber = (number) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM receipts WHERE receipt_number = '${number}'`)
        .then((result) => {
            var receipt = Receipt.create(result[0]);
            resolve(receipt);
        })
        .catch(reject);
});

// 获取产品列表
Receipt.getList = () => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM receipts`)
        .then((results) => {
            var receipts = [];
            results.forEach((receipt) => {
                var receipt = receipt.create(receipt);
                receipts.push(receipt);
            });
            resolve(receipts);
        })
        .catch(reject);
});

// ==================================== 原型方法 ====================================================
// 保存入库单
Receipt.prototype.save = function() {
    return new Promise((resolve, reject) => {
        db
            .query(`INSERT INTO receipts SET ?`, this)
            .then((result) => {
                if (result.affectedRows) {
                    this.id = result.insertId;
                    resolve(this);
                } else {
                    reject(new Error('插入数据失败' + result.message));
                }
            })
            .catch(reject);
    })
}


module.exports = Receipt;
