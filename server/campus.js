'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Campus = models.Campus;
module.exports = router;

// Get all campuses
router.get('/', (req, res, next) => {
    Campus.findAll({})
        .then(campuses => res.json(campuses))
        .catch(next)
})

// Get campus by id
router.get('/:id', (req, res, next) => {
    Campus.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(student => res.json(student))
        .catch(next)
})

// Post new campus
router.post('/', (req, res, next) => {
    Campus.create({
        name: req.body.name,
        image: req.body.image   
    })
        .then(result => res.json(result))
        .catch(next)
})

// Put updated campus info for one campus
router.put('/:id', (req, res, next) => {
    Campus.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(campus => campus.update(req.body))
        .catch(next)
})