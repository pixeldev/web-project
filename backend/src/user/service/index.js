const {client} = require('../../database');
const express = require('express');
const router = express.Router();
const {fetchAvailableTechnician} = require('../../technician');

router.post('/request', (req, res) => {
    const {serviceType, date, hour, description, userId} = req.body;

    if (!serviceType || !date || !hour || !description || !userId) {
        res.status(400).send({error: "Información incompleta."});
        return;
    }

    client.query('SELECT * FROM tipo_servicio WHERE id = $1', [serviceType], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({error: "Ha ocurrido un error."});
            return;
        }
        if (result.rows.length === 0) {
            res.status(404).send({error: "No se encontró el tipo de servicio."});
            return;
        }

        client.query('SELECT p.rol, p.autenticado, a.zona FROM persona p JOIN persona_direccion pd ON p.direccion_id = pd.id JOIN alcaldia a ON pd.alcaldia = a.id WHERE p.id = $1', [userId], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({error: "Ha ocurrido un error."});
                return;
            }

            if (result.rows.length === 0) {
                res.status(404).send({error: "Usuario no encontrado."});
                return;
            }

            const user = result.rows[0];

            if (user.rol !== 'usuario') {
                res.status(403).send({error: "Solo los usuarios pueden solicitar servicios."});
                return;
            }

            if (!user.autenticado) {
                res.status(403).send({error: "El usuario no está autenticado."});
                return;
            }

            // check if the user has a pending service request
            client.query('SELECT servicio_activo FROM usuario WHERE id_persona = $1', [userId], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send({error: "Ha ocurrido un error."});
                    return;
                }

                if (result.rows.length === 0) {
                    res.status(404).send({error: "Usuario no encontrado."});
                    return;
                }

                const {servicio_activo} = result.rows[0];

                if (servicio_activo) {
                    res.status(403).send({error: "Ya tienes un servicio activo."});
                    return;
                }

                fetchAvailableTechnician(user.zona)
                    .then(availableTechnician => {
                        if (!availableTechnician) {
                            res.status(404).send({error: "No hay técnicos disponibles en tu zona."});
                            return;
                        }

                        client.query(
                            'INSERT INTO servicio_solicitud (fecha_servicio, hora_servicio, id_persona, id_tecnico, tipo_servicio, descripcion) VALUES ($1, $2, $3, $4, $5, $6)', [date, hour, userId, availableTechnician.id, serviceType, description], (err, result) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send({error: "Ha ocurrido un error."});
                                return;
                            }

                            res.send({message: "Solicitud de servicio enviada."});
                        });
                    });
            });
        });
    });
});

module.exports = router;