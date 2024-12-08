const express = require('express');
const router = express.Router();
// const multer = require('multer');

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const tokenVerify = require('../middlewares/auth/tokenVerify');
const callingController = require('../controllers/calling/calling.controller.js');
router.post("/verifyComplaint", tokenVerify, callingController.verifyComplaint);
module.exports = router;