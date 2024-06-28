const { client } = require('../database');
const express = require('express');
const router = express.Router();
const hashWithSHA512 = require('../encrypt');

router.get('/role/:id', (req, res) => {
    const userId = req.params.id;
    client.query('SELECT rol FROM usuario WHERE id = $1', [userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('{"error": "An error occurred"}');
            return;
        }
        if (result.rows.length === 0) {
            res.status(404).send('{"error": "User not found"}');
            return;
        }
        res.send('{"role": "' + result.rows[0].rol + '"}');
    });
});

module.exports = router;