const express = require('express');
const router = express.Router();
const charCtrl = require('../../controllers/characters');
const multer = require('multer');
const upload = multer();
/* --- Public Routes --- */
// create character - /api/characters/create
router.post('/', upload.single('photo'), charCtrl.create)
// alternate create route for characters created w/o photo upload
router.post('/', upload.none(), charCtrl.create)

// characters index - /api/characters/
router.get('/', charCtrl.index)

// character detail - /api/characters/:name
router.get('/:id', charCtrl.detail)

/* --- Protected Routes --- */



module.exports = router;