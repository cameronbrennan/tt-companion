const express = require('express');
const router = express.Router();
const classCtrl = require('../../controllers/classes');

router.get('/:id', classCtrl.getClass)
// getAll endpoint? for this and Races

router.get('/', classCtrl.index)

module.exports = router;