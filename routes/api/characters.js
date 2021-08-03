const express = require('express');
const router = express.router();
const charCtrl = require('../../controllers/characters');
const multer = require('multer');
const upload = multer();
/* --- Public Routes --- */
router.post('/', upload.single('photo'), charCtrl.create)
router.get('/', charCtrl.index)


/* --- Protected Routes --- */



module.exports = router;