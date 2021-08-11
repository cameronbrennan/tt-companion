const express = require('express');
const router = express.Router();
const charCtrl = require('../../controllers/characters');
const multer = require('multer');
const upload = multer();
/* --- Routes --- */
router.post('/', upload.single('photo'), charCtrl.create)
/* alternate create route required for characters created w/o photo upload */
router.post('/', upload.none(), charCtrl.create)
router.get('/', charCtrl.index)
router.get('/:id', charCtrl.detail)

module.exports = router;