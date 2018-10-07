var express = require('express');
var router = express.Router();

var patients = require('./patients.js')
var medications = require('./medications.js')

router.use('/patients', patients);
router.use('/medications', medications);

module.exports = router;