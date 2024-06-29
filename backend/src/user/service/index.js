const { client } = require('../../database');
const express = require('express');
const router = express.Router();
const { fetchAvailableTechnician } = require('../../technician/utility');
const moment = require("moment");
const e = require("express");

const SERVICE_TYPE_QUERY = 'SELECT * FROM tipo_servicio WHERE id = $1';
const USER_INFO_QUERY = `
    SELECT p.rol, p.autenticado, a.zona
    FROM persona p
             JOIN persona_direccion pd ON p.direccion_id = pd.id
             JOIN alcaldia a ON pd.alcaldia = a.id
    WHERE p.id = $1`;
const USER_ACTIVE_SERVICE_QUERY = 'SELECT servicio_activo FROM usuario WHERE id = $1';
const INSERT_SERVICE_REQUEST_QUERY = `
    INSERT INTO servicio_solicitud (fecha_servicio, hora_servicio, id_usuario, id_tecnico, tipo_servicio, descripcion) 
    VALUES ($1, $2, $3, $4, $5, $6)`;
const UPDATE_USER_SERVICE_QUERY = `
    UPDATE usuario 
    SET servicio_activo = TRUE, servicios_solicitados = servicios_solicitados + 1 
    WHERE id = $1`;
const GET_SERVICE_STATUS_QUERY = `
    SELECT p.nombres || ' ' || p.apellido_paterno || ' ' || p.apellido_materno AS tecnico,
           s.fecha_solicitud,
           s.fecha_servicio,
           s.hora_servicio,
           ts.nombre                                                           AS tipo_servicio,
           ts.costo                                                            AS costo_servicio,
           s.descripcion,
           s.estado,
           s.id
    FROM servicio_solicitud s
             JOIN tecnico t ON s.id_tecnico = t.id
             JOIN persona p ON t.id = p.id
             JOIN tipo_servicio ts ON s.tipo_servicio = ts.id
    WHERE s.id_usuario = $1;`

const handleError = (res, status, error) => {
    console.error(error);
    res.status(status).send({ error });
};

const validateRequestBody = (body) => {
    const { serviceType, date, hour, description, userId } = body;
    return serviceType && date && hour && description && userId;
};

const getServiceType = async (serviceType) => {
    const result = await client.query(SERVICE_TYPE_QUERY, [serviceType]);
    return result.rows.length > 0;
};

const getUserInfo = async (userId) => {
    const result = await client.query(USER_INFO_QUERY, [userId]);
    return result.rows[0];
};

const getUserActiveServiceStatus = async (userId) => {
    const result = await client.query(USER_ACTIVE_SERVICE_QUERY, [userId]);
    return result.rows[0]?.servicio_activo;
};

const createServiceRequest = async (date, hour, userId, technicianId, serviceType, description) => {
    await client.query(INSERT_SERVICE_REQUEST_QUERY, [date, hour, userId, technicianId, serviceType, description]);
};

const updateUserServiceStatus = async (userId) => {
    await client.query(UPDATE_USER_SERVICE_QUERY, [userId]);
};

router.post('/request', async (req, res) => {
    try {
        const { serviceType, date, hour, description, userId } = req.body;

        if (!validateRequestBody(req.body)) {
            return res.status(400).send({ error: "Información incompleta." });
        }

        if (!await getServiceType(serviceType)) {
            return res.status(404).send({ error: "No se encontró el tipo de servicio." });
        }

        const user = await getUserInfo(userId);

        if (!user) {
            return res.status(404).send({ error: "Usuario no encontrado." });
        }

        if (user.rol !== 'usuario') {
            return res.status(403).send({ error: "Solo los usuarios pueden solicitar servicios." });
        }

        if (!user.autenticado) {
            return res.status(403).send({ error: "El usuario no está autenticado." });
        }

        if (await getUserActiveServiceStatus(userId)) {
            return res.status(403).send({ error: "Ya tienes un servicio activo." });
        }

        const availableTechnician = await fetchAvailableTechnician(user.zona);

        if (!availableTechnician) {
            return res.status(404).send({ error: "No hay técnicos disponibles en tu zona." });
        }

        await createServiceRequest(date, hour, userId, availableTechnician.id, serviceType, description);
        await updateUserServiceStatus(userId);

        res.status(201).send({ message: "Solicitud de servicio creada." });
    } catch (error) {
        handleError(res, 500, "Ha ocurrido un error.");
    }
});

router.get('/active', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).send({ error: "Información incompleta." });
        }

        const user = await getUserInfo(userId);

        if (!user) {
            return res.status(404).send({ error: "Usuario no encontrado." });
        }

        if (user.rol !== 'usuario') {
            return res.status(403).send({ error: "Solo los usuarios pueden solicitar servicios." });
        }

        const activeService = await getUserActiveServiceStatus(userId);

        res.status(200).send({ activeService });
    } catch (error) {
        handleError(res, 500, "Ha ocurrido un error.");
    }
});

router.get('/get', async (req, res) => {
    try {
        const queryResult = await client.query(GET_SERVICE_STATUS_QUERY, [req.query.userId]);
        const result = queryResult.rows[0];
        res.status(200).send({
            technician: result.tecnico,
            requestDate: moment(result.fecha_solicitud).format('DD/MM/YYYY HH:mm'),
            serviceDate: moment(result.fecha_servicio).format('DD/MM/YYYY'),
            serviceHour: result.hora_servicio,
            serviceType: result.tipo_servicio,
            serviceCost: result.costo_servicio,
            serviceDescription: result.descripcion,
            serviceStatus: result.estado,
            serviceId: `Servicio #${result.id}`
        });
    } catch (error) {
        console.error(error);
        handleError(res, 500, "Ha ocurrido un error.");
    }
});

module.exports = router;