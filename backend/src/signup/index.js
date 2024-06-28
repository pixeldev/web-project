const {client} = require('../database');
const express = require('express');
const router = express.Router();
const hashWithSHA512 = require('../encrypt');

router.post('/', (req, res) => {
    const user = req.body;
    console.log(user);
    client.query(
        'SELECT * FROM persona WHERE email = $1', [user.email],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({error: "Ha ocurrido un error."});
                return;
            }
            if (result.rows.length > 0) {
                res.status(409).send({error: "Ya existe un usuario con ese correo electrónico."});
                return;
            }
            client.query(
                'INSERT INTO persona_direccion (calle, colonia, numero_int, numero_ext, alcaldia, codigo_postal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
                [user.address, user.suburb, user.intNumber, user.extNumber, user.cityHall, user.postalCode],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send({error: "Ha ocurrido un error."});
                        return;
                    }
                    const idAddress = result.rows[0].id;
                    const hashedPassword = hashWithSHA512(user.password);
                    client.query(
                        'INSERT INTO persona (nombres, apellido_paterno, apellido_materno, email, contrasena, telefono, direccion_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
                        [user.name, user.lastname, user.secondLastname, user.email, hashedPassword, user.phone, idAddress],
                        (err, result) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send({error: "Ha ocurrido un error."});
                                return;
                            }
                            client.query(
                                'INSERT INTO usuario (id) VALUES ($1)',
                                [result.rows[0].id],
                                (err) => {
                                    if (err) {
                                        console.error(err);
                                        res.status(500).send({error: "Ha ocurrido un error."});
                                        return;
                                    }
                                    res.send({message: "Usuario creado con éxito. Inicia sesión."});
                                }
                            )
                        }
                    );
                }
            );
        });
});

module.exports = router;