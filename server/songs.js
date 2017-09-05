var router = require('express').Router();
const Song = require('../db/models/songs')

router.get('/', (req, res, next) => {
    Song.findAll({})
        .then(data => res.json(data))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Song.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(data => res.json(data))
        .catch(next);
})

router.post('/', (req, res, next) => {
    console.log('ARTIST: ', req.body.song.artists[0].name)
    console.log('IMAGE: ', req.body.song.album.images[2])
    Song.create({
        name: req.body.song.name,
        // externalUrl: req.body.song.external_urls.spotify,
        songId: req.body.song.id,
        preview_url: req.body.song.preview_url,
        playlistId: req.body.chatId,
        uri: req.body.song.uri,
        artist: req.body.song.artists[0].name,
        image: req.body.song.album.images[2].url
    })
    .then(data => res.json(data))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
    Song.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(song => {
            console.log('SONG: ', song)
            let numLikes = song.likes
            song.update({
                likes: numLikes + 1
            })
        })
        .then(updated => res.json(updated))
        .catch(next)
})

module.exports = router;