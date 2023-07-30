const express = require('express');
const users = require('../routes/users');
const notes = require('../routes/notes');
const auth = require('../routes/auth');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/notes', notes);
    app.use('/api/auth', auth);
}