const {client} = require('../database');

function fetchAvailableTechnician(zone) {
    return new Promise((resolve, reject) => {
        client.query('SELECT t.id FROM tecnico t JOIN persona p ON p.id = t.id_persona JOIN persona_direccion pd_t ON p.direccion_id = pd_t.id JOIN alcaldia a_t ON a_t.id = pd_t.alcaldia WHERE a_t.zona = $1 LIMIT 1', [zone], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            if (result.rows.length === 0) {
                resolve(null);
                return;
            }
            resolve(result.rows[0]);
        });
    });
}

module.exports = {
    fetchAvailableTechnician
}