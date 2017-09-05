var router = require('express').Router();
const Playlist = require('../db/models/playlists')
const models = require('../db/models')
const User = models.User

router.get('/', (req, res, next) => {
    Playlist.findAll({})
        .then(data => res.json(data))
        .catch(next)
})

router.post('/', (req, res, next) => {
    console.log('IN POST: ', req.body)
    Playlist.create({
        name: req.body.name,
        externalUrl: req.body.externalUrl,
        playlistId: req.body.playlistId,
        userId: req.body.userId,
        likesNeeded: req.body.likesNeeded
    })
    .then(playlist => res.json(playlist))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Playlist.findOne({
        include: [{all: true}],
        where: {
            id: req.params.id
        }
    })
    .then(playlist => res.json(playlist))
    .catch(next)
})

module.exports = router;