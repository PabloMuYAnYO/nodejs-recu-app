const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', function(req, res, next) {
  res.send('respond with aulas');
});

module.exports = router;