const {client} = require('../database');
const express = require('express');
const router = express.Router();
const hashWithSHA512 = require('../encrypt');

const ACCOUNT_DETAILS_QUERY = `
    SELECT p.nombres,
           p.apellido_paterno,
           p.apellido_materno,
           p.email,
           pd.calle,
           pd.colonia,
           pd.numero_int,
           pd.numero_ext,
           a.nombre,
           pd.codigo_postal,
           p.telefono
    FROM persona p
             JOIN persona_direccion pd ON p.direccion_id = pd.id
             JOIN alcaldia a ON pd.alcaldia = a.id
    WHERE p.id = $1;`;

const UPDATE_ACCOUNT_DETAILS_QUERY = `
    UPDATE persona
    SET nombres          = $1,
        apellido_paterno = $2,
        apellido_materno = $3,
        email            = $4,
        telefono         = $5
    WHERE id = $6;`

const UPDATE_ADDRESS_QUERY = `
    UPDATE persona_direccion
    SET calle         = $1,
        colonia       = $2,
        numero_int    = $3,
        numero_ext    = $4,
        alcaldia      = $5,
        codigo_postal = $6
    WHERE id = (SELECT direccion_id FROM persona WHERE id = $7);`;

router.get('/', (req, res) => {
    const userId = req.query.userId;
    client.query(ACCOUNT_DETAILS_QUERY, [userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('{"error": "An error occurred"}');
            return;
        }
        const user = result.rows[0];
        res.send({
            names: user.nombres,
            lastName: user.apellido_paterno,
            secondLastName: user.apellido_materno,
            email: user.email,
            street: user.calle,
            suburb: user.colonia,
            intNumber: user.numero_int,
            extNumber: user.numero_ext,
            cityHall: user.nombre,
            postalCode: user.codigo_postal,
            phone: user.telefono
        });
    });
});

router.post('/', async (req, res) => {
    const user = req.body;
    const userId = req.query.userId;

    try {
        await client.query(UPDATE_ACCOUNT_DETAILS_QUERY, [user.nombre, user.apellidoPaterno, user.apellidoMaterno, user.CorreoElectronico, user.Telefono, userId]);
        await client.query(UPDATE_ADDRESS_QUERY, [user.Calle, user.Colonia, user.NumeroInterior, user.NumeroExterior, user.Alcaldia, user.CodigoPostal, userId]);
        res.send({message: "Account updated"});
    } catch (e) {
        console.error(e);
        res.status(500).send({error: "An error occurred"});
    }
});

router.get('/role', (req, res) => {
    const userId = req.query.userId;
    client.query('SELECT rol FROM persona WHERE id = $1', [userId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('{"error": "An error occurred"}');
            return;
        }
        if (result.rows.length === 0) {
            res.status(404).send('{"error": "User not found"}');
            return;
        }
        res.send({role: result.rows[0].rol });
    });
});

module.exports = router;