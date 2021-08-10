const express = require('express');
const router = express.Router();
const classCtrl = require('../../controllers/classes');

router.get('/:id', classCtrl.getOne)
// getAll endpoint? for this and Races

router.get('/', classCtrl.getAll)

module.exports = router;