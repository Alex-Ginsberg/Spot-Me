'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const User = models.User;
module.exports = router;

// Gets all students
router.get('/', (req, res, next) => {
    User.findAll({})
        .then(students => {
            res.json(students)
        })
        .catch(next)
})

// Gets a student by id
router.get('/:id', (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(student => res.json(student))
        .catch(next)
})

// Post new student
router.post('/', (req, res, next) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        campusId: req.body.campusId
    })
        .then(result => res.json(result))
        .catch(next)
})

// Put updated student info for one student
router.put('/:id', (req, res, next) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(student => student.update(req.body))
        .catch(next)
})

// Delete a student
router.delete(':/id', (req, res, next) => {
    return User.destory({
        where: {
            id: req.params.id
        }
    })
    .catch(next)
})