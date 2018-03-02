
var express = require('express')

var router = express.Router()
var mixtapes = require('./mixtapes.route')


router.use('/mixtapes', mixtapes);


module.exports = router;