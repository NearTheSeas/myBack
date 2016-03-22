const db = require('./db');

function User(id, username, password, realname) {
    this.id = id;
    this.username = username || '';
    this.password = password || '';
    this.realname = realname || '';
}

// 将数据库查询出来的rowdata对象 转为user对象
User.create = (obj) => {
    if (!obj) {
        return null;
    }
    return new User(obj.id, obj.username, obj.password, obj.realname);
};

// 根据用户名查找
User.getByUsername = (username) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE username = '${username}'`)
        .then((result) => {
            var user = User.create(result[0]);
            resolve(user);
        })
        .catch(reject);
});

// 根据用户名查找
User.getList = () => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users `)
        .then((results) => {
            var users = [];
            results.forEach((user) => {
                var user = User.create(user);
                users.push(user);
            });
            resolve(users);
        })
        .catch(reject);
});

module.exports = User;