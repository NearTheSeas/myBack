const mysql = require('mysql');

// 建立数据库连接池
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'warehouse',
    connectTimeout: 100
});

// promise对象方式实现查询操作
exports.query = (sql, params) => new Promise((resolve, reject) => {
    pool.query(sql, params, (error, result, fields) => {
        if (error) {
            reject(error);
        } else {
            resolve(result, fields);
        }
    });
});