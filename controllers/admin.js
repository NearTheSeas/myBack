const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

exports.index = (req, res) => {
    var current_user = req.session.current_user;
    res.render('admin/index', { layout: "", current_user: current_user });
};