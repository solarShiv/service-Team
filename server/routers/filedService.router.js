const express = require('express');
const router = express.Router();
const fieldServiceController = require('../controllers/fieldService/fieldService.controller')
router.post("/complaintAccept", fieldServiceController.complaintAccept);

module.exports = router;