const {client} = require('../database');
const express = require('express');
const router = express.Router();
const hashWithSHA512 = require('../encrypt');

router.post('/', (req, res) => {
    // first, we need to get the user data from the request
    const user = req.body;
    // then, we need to hash the password
    const hashedPassword = hashWithSHA512(user.password);
    console.log(hashedPassword);
    // now we can query the database
    client.query('SELECT id, rol FROM persona WHERE email = $1 AND contrasena = $2', [user.email, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('{ "error": "Error al intentar loguear" }');
            return;
        }
        if (result.rows.length === 0) {
            res.status(401).send('{ "error": "Usuario o contraseña incorrectos" }');
            return;
        }
        const id = result.rows[0].id;
        const rol = result.rows[0].rol;
        client.query('UPDATE persona SET autenticado = true WHERE id = $1', [id], (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('{ "error": "Error al intentar loguear" }');
                return;
            }
            res.status(200).send('{ "message": "Usuario logueado correctamente", "id": ' + id + ', "rol": "' + rol + '"}');
        });
    });
});

router.get('/authenticated', (req, res) => {
    const id = req.query.id;
    client.query('SELECT autenticado FROM persona WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('{ "error": "Error al intentar verificar autenticación" }');
            return;
        }
        if (result.rows.length === 0) {
            res.status(404).send('{ "error": "Usuario no encontrado" }');
            return;
        }
        res.status(200).send('{ "authenticated": ' + result.rows[0].autenticado + ' }');
    });
});

router.post('/logout', (req, res) => {
    const id = req.body.id;
    client.query('UPDATE persona SET autenticado = false WHERE id = $1', [id], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('{ "error": "Error al intentar cerrar sesión" }');
            return;
        }
        res.status(200).send('{ "message": "Sesión cerrada correctamente" }');
    });
});

module.exports = router;