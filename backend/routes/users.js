var express = require('express');
var router = express.Router();
var db = require('../lib/db')
router.get('/', async function(req, res, next) {
    let row = await db('user')
    res.send({
        status: true,
        user: row
    })
})
router.post('/create', async function(req, res) {
    let rows = await db('user')
        .insert({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
    return res.send({ status: true })
})

module.exports = router;