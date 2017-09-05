var router = require('express').Router();
const Message = require('../db/models/messages')

router.get('/', (req, res, next) => {
    Message.findAll({})
        .then(messages => res.json(messages))
        .catch(next)
})

router.post('/', (req, res, next) => {
    console.log('CONTENT: ', req.body.content)
    Message.create({
        body: req.body.content,
        userId: req.body.userId,
        playlistId: req.body.playlistId
    })
    .then(message => res.json(message))
    .catch(next)
})


module.exports = router;