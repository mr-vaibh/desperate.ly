const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.get('/game', (req, res, next) => {
    // This will return all the data, exposing only the id and action field to the client
    Game.find()
        .then((data) => res.json(data))
        .catch(next);
});

router.post('/game', (req, res, next) => {
    Game.create(req.body)
        .then((data) => res.json(data))
        .catch(next);
});

router.delete('/game/:id', (req, res, next) => {
    Game.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
});

module.exports = router;