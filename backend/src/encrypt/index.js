const crypto = require('crypto');

function hashWithSHA512(data) {
    const hash = crypto.createHash('sha512');
    hash.update(data);
    return hash.digest('hex');
}

module.exports = hashWithSHA512;