const {client} = require('../database');
const express = require('express');
const router = express.Router();
const GET_NAME_QUERY = `
    SELECT nombres || ' ' || apellido_paterno || ' ' || apellido_materno AS nombre,
           autenticado,
           rol
    FROM persona
    WHERE id = $1;`;

const handleError = (res, status, error) => {
    console.error(error);
    res.status(status).send({error});
};

router.get('/name', async (req, res) => {
    try {
        const userId = req.query.userId;
        const queryResult = await client.query(GET_NAME_QUERY, [userId]);
        if (queryResult.rows.length === 0) {
            res.status(404).send({error: "Usuario no encontrado"});
            return;
        }
        const result = queryResult.rows[0];
        if (!result.autenticado) {
            res.status(401).send({error: "Usuario no autenticado"});
            return;
        }
        if (result.rol !== 'tecnico') {
            res.status(403).send({error: "Usuario no es un técnico"});
            return;
        }
        res.status(200).send({name: result.nombre});
    } catch (error) {
        console.error(error);
        handleError(res, 500, "Ha ocurrido un error.");
    }
});

module.exports = router;