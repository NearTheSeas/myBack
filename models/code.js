const db = require('./db');

//　product构造函数
function Code(id, code_number, p_code, status) {
    this.id = id;
    this.code_number = code_number || '';
    this.p_code = p_code;
    this.status = status || true
}
// ==================================== 静态方法 ====================================================
Code.create = (obj) => {
    if (!obj) {
        return null;
    }
    return new Code(obj.id, obj.code_number, obj.p_code, obj.status);
};

// 根据产品内部编码查找
Code.getByNumber = (number) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM codes WHERE code_number = '${number}'`)
        .then((result) => {
            var code = Code.create(result[0]);
            resolve(code);
        })
        .catch(reject);
});
// 返回带子节点的code
Code.prototype.getChild = function() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM codes WHERE p_code = '${this.id}'`)
            .then((results) => {
                this.children = [];
                results.forEach((obj) => {
                    var code = Code.create(obj);
                    this.children.push(code);
                });
                resolve(this);
            })
            .catch(reject);
    });
}

// 获取仓位列表
Code.getList = () => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM codes`)
        .then((results) => {
            this.children = [];
            results.forEach((code) => {
                var code = Code.create(code);
                codes.push(code);
            });
            resolve(codes);
        })
        .catch(reject);
});

module.exports = Code;
