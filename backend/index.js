const express = require('express');
const app = express();
const logger = require('./startup/logger')();

require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();
require('./startup/logging')();

const port = process.env.PORT || 3900;
app.listen(port, () => {
    logger.info(`Server running on port ${port}...`);
})

