const {client} = require('../database');
const express = require('express');
const router = express.Router();

router.get('/types', (req, res) => {
    client.query('SELECT * FROM tipo_servicio', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({error: "An error occurred"});
            return;
        }
        res.json(result.rows);
    });
});

module.exports = router;