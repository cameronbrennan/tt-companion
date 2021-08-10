const express = require('express');
const router = express.Router();
const raceCtrl = require('../../controllers/races');

router.get('/', raceCtrl.getAll)

module.exports = router;