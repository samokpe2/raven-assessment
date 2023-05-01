const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const userService = require('../../services/v1/users');


router.post('/', async (request, response) => {
    request.body.role = "User"
    const res = await userService.create(request.body)
    response.status(res.status).send(res);
})


router.post('/login', async (request, response) => {
    const res = await userService.login(request.body)
    response.status(res.status).send(res);
})




module.exports = router;