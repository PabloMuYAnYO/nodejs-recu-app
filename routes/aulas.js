const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', function(req, res, next) {
  res.render('aulas/add');
});

router.post('/add', async function(req, res, next) {
    const { title, url, description } = req.body;
    const newAula = {
        title,
        url,
        description,
    };
    await pool.query('INSERT INTO aulas set ?', [newAula]);
    req.flash('exito', 'Aula añadida exitosamente');
    res.redirect('/aulas');
});

router.get('/', async (req, res) => {
    const aulas = await pool.query('SELECT * FROM aulas');
    res.render('aulas/list', { aulas });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM aulas WHERE ID = ?', [id]);
    req.flash('exito', 'Aula eliminada exitosamente');
    res.redirect('/aulas');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const aulas = await pool.query('SELECT * FROM aulas WHERE id = ?', [id]);
    res.render('aulas/edit', {aula: aulas[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, url} = req.body; 
    const newAula = {
        title,
        description,
        url
    };
    await pool.query('UPDATE aulas set ? WHERE id = ?', [newAula, id]);
    req.flash('exito', 'Aula actualizada exitosamente');
    res.redirect('/aulas');
});

module.exports = router;