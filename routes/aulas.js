const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', function(req, res, next) {
  res.render('aulas/add');
});

router.post('/add', function(req, res, next) {
    res.send('recibido');
  });

module.exports = router;