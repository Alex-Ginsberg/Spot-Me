var router = require('express').Router();
const User = require('../db/models/user')


router.get(`/:userId`, (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.userId
        }
    })
        .then(user => res.json(user))
        .catch(next)

})

module.exports = router;