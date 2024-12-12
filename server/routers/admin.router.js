const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/admin.controller');
router.get("/reportDownload", adminController.reportDownLoad);
router.get("/showEmployees", adminController.showEmployees);
router.delete("/deleteEmployee", adminController.deleteEmployee);
router.get("/countComplaint", adminController.countComplaint);

module.exports = router;