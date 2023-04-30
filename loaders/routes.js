const express = require('express');
const user = require('../routes/v1/user');
const admin = require('../routes/v1/admin');
const error = require('../middleware/error');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/v1/user', user);
    app.use('/api/v1/admin', admin);
    app.use(error);
    app.use((req, res, next) => {
        console.log(req.originalUrl)
        res.status(404).send(
            {
                "message":"Not Found",
                "status":404,
            }
        )
    })
    
}