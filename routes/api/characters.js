const express = require('express');
const router = express.Router();
const charCtrl = require('../../controllers/characters');
const multer = require('multer');
const upload = multer();
/* --- Public Routes --- */
// create character - /api/characters/create
router.post('/', upload.single('photo'), charCtrl.create)
// !!!create alternate post route for characters w/o photo upload

// characters index - /api/characters/
router.get('/', charCtrl.index)


/* --- Protected Routes --- */



module.exports = router;