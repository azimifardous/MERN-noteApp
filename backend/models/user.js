const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { jwtPrivateKey } = require('../config/config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    avatar: {
        type: String
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        avatar: this.avatar
    }, jwtPrivateKey);
}

const User = mongoose.model('users', userSchema);

function validateNewUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required()
    });

    return schema.validate(user);
}

function validateExistingUser(user) {
    const schema = Joi.object({
        name: Joi.string(),
        currentPassword: Joi.string(),
        newPassword: Joi.string(),
        email: Joi.string().email()
    });

    return schema.validate(user);
}

exports.User = User;
exports.userSchema = userSchema;
exports.validateNewUser = validateNewUser;
exports.validateExistingUser = validateExistingUser;