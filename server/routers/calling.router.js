const express = require('express');
const router = express.Router();

const tokenVerify = require('../middlewares/auth/tokenVerify');
const callingController = require('../controllers/calling/calling.controller.js');
router.post("/verifyComplaint", tokenVerify, callingController.verifyComplaint);
module.exports = router;