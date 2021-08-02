const express = require('express');
const router = express.Router();
const classCtrl = require('../../controllers/classes');

router.get('/', classCtrl.getClass)

module.exports = router;