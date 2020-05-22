var express = require('express')
var router = express.Router()

router.use('/sign-up', require('./sign-up'))
router.use('/login', require('./login'))
router.use('/secret-ruote', require('./secret-ruote'))
router.use('/register', require('./register'));
// router.use('/inspection', require('./inspection'));
// router.use('/inspection1', require('./inspection1'));
// router.use('/fee', require('./fee'));
// router.use('/report',require('./report'));
// router.use('/organization', require('./organization'));
// router.use('/organization1', require('./organization1'));
// router.use('/type', require('./type'));
// router.use('/model', require('./model'));
// router.use('/color', require('./color'));
// router.use('/standardSetting',require('./standardSetting'));
// router.use('/user', require('./user'));

// router.use('/village', require('./village'));
// router.use('/district', require('./district'));
// router.use('/province', require('./province'));
// router.use('/use', require('./use'));

// router.use('/feesetting', require('./feesetting'));

// router.use('/owner', require('./owner'));

router.use('/users', require('./users'));
// router.use('/registration', require('./registration'));
// router.use('/type_register', require('./type_register'));
// router.use('/testfee', require('./testfee'));
// router.use('/testfee1', require('./testfee1'));
// router.use('/testfee2', require('./testfee2'));
// router.use('/testfee3', require('./testfee3'));
// router.use('/branch', require('./branch'));
// router.use('/level', require('./level'));
// router.use('/usersetting', require('./usersetting'));
// router.use('/upload',require('./upload'));

// router.use('/upload',require('./upload'))

// router.use('/cardata',require('./cardata'))

module.exports = router