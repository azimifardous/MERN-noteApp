require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');

module.exports = function () {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'logfile.log' })
        ],
        exceptionHandlers: [
            new winston.transports.File({ filename: 'uncaughtExceptions.log' })
        ],
        rejectionHandlers: [
            new winston.transports.File({ filename: 'logfile.log' })
        ]
    });

    logger.exceptions.handle();
    logger.rejections.handle();
}