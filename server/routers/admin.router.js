const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/admin.controller');
router.get("/repoartDownload", adminController.reportDownLoad);

module.exports = router;