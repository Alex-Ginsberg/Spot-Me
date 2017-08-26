const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const User = models.User;
module.exports = router;

router.get('/:campusId', (req, res, next) =>
    User.findAll({
        where: {
            campusId: req.params.campusId
        }
    })
    .then(student => res.json(student))
    .catch(next)
)