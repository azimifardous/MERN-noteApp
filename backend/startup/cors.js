const cors = require('cors');
const { origin } = require('../config/config');

module.exports = function (app) {
    app.use(cors(
        {
            origin,
            optionsSuccessStatus: 200
        }
    ));
};