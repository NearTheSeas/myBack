const express = require('express');
const router = express.Router();

const code = require('../controllers/code');

router.get('/detail/:number', code.detail);

module.exports = router;
