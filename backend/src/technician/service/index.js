const {client} = require('../../database');
const express = require('express');
const router = express.Router();

const TODAY_QUERY = `
    SELECT s.id, s.hora_servicio, t.nombre AS nombre_servicio
    FROM servicio_solicitud s
             JOIN tipo_servicio t ON s.tipo_servicio = t.id
    WHERE s.id_tecnico = $1
      AND s.fecha_servicio = CURRENT_DATE
      AND s.estado != 'finalizado'
    ORDER BY s.hora_servicio;`;

const handleError = (res, status, error) => {
    console.error(error);
    res.status(status).send({error});
};

router.get('/today', async (req, res) => {
    try {
        const technicianId = req.query.technicianId;
        const queryResult = await client.query(TODAY_QUERY, [technicianId]);
        res.status(200).send(queryResult.rows);
    } catch (error) {
        handleError(res, 500, "Ha ocurrido un error.");
    }
});

module.exports = router;