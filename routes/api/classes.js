const express = require('express');
const router = express.Router();
const classCtrl = require('../../controllers/classes');

router.get('/', classCtrl.getAll)
router.get('/:id', classCtrl.getOne)

module.exports = router;