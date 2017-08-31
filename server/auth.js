var router = require('express').Router();

router.get('/me', (req, res, next) => {
    console.log('CURRENT SESSION: ', req.session)
    res.send(req.session)
})

module.exports = router;