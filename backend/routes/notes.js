const Note = require('../models/note');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    // only provide the notes of the loginned user
    const notes = await Note.find({ user: req.user }).exec();
    if (!notes)
        return res.status(404).send('There is no note available');
    res.send(notes);
});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
    const note = await Note.findOne({ _id: req.params.id, user: req.user }).exec();
    if (!note)
        return res.status(404).send('There is no note available');
    res.send(note);
});

router.post('/', auth, async (req, res) => {
    // didn't see any point in validating the req.body
    // since the content can be empty as well.
    const note = new Note({
        content: req.body.content,
        color: req.body.color,
        user: {
            _id: req.user._id,
            name: req.user.name,
        }
    });

    await note.save();
    res.send(note);
})

router.patch('/:id', [auth, validateObjectId], async (req, res) => {
    let note = await Note.findOne({ _id: req.params.id, user: req.user }).exec();

    if (!note)
        return res.status(404).send("Note is not found.");

    note.content = req.body.content;
    await note.save();
    res.send(note);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
    let note = await Note.findOne({ _id: req.params.id, user: req.user });
    if (!note)
        return res.status(404).send("Note is not found.");

    note = await note.deleteOne();
    res.send(note);
})

module.exports = router;