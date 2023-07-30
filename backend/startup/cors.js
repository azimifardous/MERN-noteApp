const cors = require('cors');

module.exports = function (app) {
    app.use(cors(
        {
            origin: "https://mern-noteapp.vercel.app",
            optionsSuccessStatus: 200
        }
    ));
};