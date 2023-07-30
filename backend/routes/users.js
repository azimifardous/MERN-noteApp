const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validateReq = require('../middleware/validateReq');
const validateObjectId = require('../middleware/validateObjectId');
const _ = require('lodash');
const { User, validateNewUser, validateExistingUser } = require('../models/user');
const { AvatarGenerator } = require('random-avatar-generator');
const generator = new AvatarGenerator();

router.get('/:id', validateObjectId, async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user)
        return res.status(404).send("User not found.");

    res.send(_.pick(user, ['name', 'email', "avatar"]));
})

router.post('/', async (req, res) => {
    validateReq(validateNewUser);

    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send("User is already registerd.");

    user = new User(_.pick(req.body, ["name", 'email', 'password']));
    user.avatar = generator.generateRandomAvatar();

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save()
    const token = user.generateAuthToken();
    res.header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send(_.pick(user, ["_id", "name", "email"]));
});

router.patch("/:id/:avatar", validateObjectId, async (req, res) => {
    const { id, avatar } = req.params;
    const user = await User.findById(id);

    if (!user)
        return res.status(404).send("User not found.");

    user[avatar] = generator.generateRandomAvatar();
    await user.save();
    res.send(_.pick(user, ['avatar']));
})

router.put('/:id', validateObjectId, async (req, res) => {
    // request body validation before updating
    validateReq(validateExistingUser);

    const currentUser = _.pick(req.body, ['name', 'email', "currentPassword", 'newPassword', 'avatar']);
    // if the validation is passed, let's compare the currentPass with the one in the db
    const user = await User.findById(req.params.id);
    const isPasswordsMatched = await bcrypt.compare(currentUser.currentPassword, user.password);
    if (!isPasswordsMatched)
        return res.status(401).send("Invalid current password.");

    if (currentUser.currentPassword === currentUser.newPassword)
        return res.status(400).send("Current and new passwords cannot be the same.");

    // hash the new password before updating
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(currentUser.newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        name: currentUser.name,
        email: currentUser.email,
        password: hashedPassword,
    }, { new: true });

    return res.send(_.pick(updatedUser, ['_id', 'email', 'name', 'avatar']));
});

router.delete("/:id", validateObjectId, async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
        return res.status(404).send("User not found")

    res.send(_.pick(user, ['_id', 'name', 'email']));
})



module.exports = router;