const express = require('express');
const user = require('../routes/v1/user');
const admin = require('../routes/v1/admin');
const category = require('../routes/v1/category');
const audio = require('../routes/v1/audio');
const review = require('../routes/v1/review');
const error = require('../middleware/error');

module.exports = (app) => {
    app.use(express.json());
    app.use('/api/v1/user', user);
    app.use('/api/v1/admin', admin);
    app.use('/api/v1/category', category);
    app.use('/api/v1/audio', audio);
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