const db = require('./db');

//　product构造函数
function Product(id, product_number, product_name, product_size, capacity, picture) {
    this.id = id;
    this.product_number = product_number || '';
    this.product_name = product_name || '';
    this.product_size = product_size || '';
    this.capacity = capacity || '';
    this.picture = picture || '';
}
// ==================================== 静态方法 ====================================================
// 将数据库查询出来的rowdata对象 转为Product对象
Product.create = (obj) => {
    if (!obj) {
        return null;
    }
    return new Product(obj.id, obj.product_number, obj.product_name, obj.product_size, obj.capacity, obj.picture);
};

// 根据产品内部编码查找
Product.getByNumber = (number) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products WHERE product_number = '${number}'`)
        .then((result) => {
            var product = Product.create(result[0]);
            resolve(product);
        })
        .catch(reject);
});

// 获取产品列表
Product.getList = () => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM products`)
        .then((results) => {
            var products = [];
            results.forEach((product) => {
                var product = Product.create(product);
                products.push(product);
            });
            resolve(products);
        })
        .catch(reject);
});

// ==================================== 原型方法 ====================================================
// 保存产品
Product.prototype.save = function() {
    return new Promise((resolve, reject) => {
        db
            .query(`INSERT INTO products SET ?`, this)
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

module.exports = Product;
