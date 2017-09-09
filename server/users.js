var router = require('express').Router();
const db = require('../db/models')
const User = db.User;
const Friends = db.Friends;
const Member = db.Member;


router.get('/', (req, res, next) => {
    User.findAll({})
        .then(users => res.json(users))
        .catch(next)
})

router.get(`/:userId`, (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.userId
        }
    })
        .then(user => res.json(user))
        .catch(next)

})

router.get('/friends/:userId', (req, res, next) => {
    Friends.findAll({
        where: {
            userId: req.params.userId
        },
        attributes: ['friendId']
        
    })
    .then(friendArray => {
        let idArray = [];
        for (var i = 0; i < friendArray.length; i++) {
            idArray.push(friendArray[i].friendId)
        }
        return idArray;
    })
    .then(idArray => {
            User.findAll({
                where: {
                    id: {in: idArray}
                }
            })
            .then(friends => res.json(friends))
    })
    .catch(next)
})

router.post('/friends', (req, res, next) => {
    Friends.create({
        userId: req.body.userId,
        friendId: req.body.friendId
    })
        .then(Friends.create({
            userId: req.body.friendId,
            friendId: req.body.userId
        }))
    .catch(next)
})

router.post('/members', (req, res, next) => {
    Member.create({
        userId: req.body.userId,
        playlistId: req.body.playlistId
    })
    .catch(next)
})

module.exports = router;