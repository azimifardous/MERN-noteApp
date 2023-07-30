const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const validateReq = require('../middleware/validateReq');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    validateReq(validateUser);

    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("Invalid email or password.");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    res.json(token);
})

function validateUser(request) {
    const schema = Joi.object({
        password: Joi.string().required(),
        email: Joi.string().email().required()
    });

    return schema.validate(request);
}

module.exports = router;