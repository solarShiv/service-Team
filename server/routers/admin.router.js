const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/admin.controller');
router.get("/reportDownload", adminController.reportDownLoad);

module.exports = router;