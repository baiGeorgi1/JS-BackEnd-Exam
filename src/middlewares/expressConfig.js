const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { auth } = require('../middlewares/auth');
function expressConfigs(app) {
    app.use(express.static('./src/static'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth);
}

module.exports = expressConfigs;