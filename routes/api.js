const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.post('/game', (req, res, next) => {
    Game.create(req.body)
        .then((data) => res.json(data))
        .catch(next);
});

router.get('/game/:slug', (req, res, next) => {
    Game.findOne({ slug: req.params.slug })
        .then((data) => res.json(data))
        .catch(next);
});

module.exports = router;