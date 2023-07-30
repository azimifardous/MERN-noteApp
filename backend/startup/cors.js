const cors = require('cors');

module.exports = function (app) {
    app.use(cors(
        {
            origin: "mern-noteapp.vercel.app"
        }
    ));
};