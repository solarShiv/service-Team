const express = require('express');
const router = express.Router();
const tokenVerify = require('../middlewares/auth/tokenVerify');
const serviceController = require('../controllers/service/service.controller')
router.put("/updateComplaint",tokenVerify, serviceController.updateComplaint)


module.exports = router;