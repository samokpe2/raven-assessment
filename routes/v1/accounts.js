const express = require('express');
const router = express.Router();
const accountService = require('../../services/v1/accounts');
const auth = require("../../middleware/auth")

router.post('/', auth, async (request, response) => {
    const res = await accountService.create(request.user);
    response.status(res.status).send(res);
})



module.exports = router;