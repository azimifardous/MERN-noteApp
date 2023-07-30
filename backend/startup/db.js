const mongoose = require('mongoose');
const logger = require('./logger')();
const { db } = require('../config/config');

module.exports = function () {
    mongoose.connect(db)
        .then(() => logger.info(`connected to ${db}....`))
}