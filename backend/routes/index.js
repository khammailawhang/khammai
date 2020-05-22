var express = require('express')
var router = express.Router()

router.use('/sign-up', require('./sign-up'))
router.use('/login', require('./login'))
router.use('/secret-ruote', require('./secret-ruote'))
router.use('/register', require('./register'));


// router.use('/users', require('./users'));


module.exports = router