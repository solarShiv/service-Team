const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const tokenVerify = require('../middlewares/auth/tokenVerify');
const farmerController = require('../controllers/farmer/farmer.controller.js');

router.post("/add", farmerController.addFarmer);
router.post("/addByExcel",upload.single('file'), farmerController.addFarmerByExcel);
router.get("/showFarmer", farmerController.showFarmer);
router.post("/addComplaint", tokenVerify, farmerController.addComplaint);
router.get("/showComplaint", farmerController.showComplaint);
router.post("/addComplaintByExcel",  tokenVerify, upload.single('file'), farmerController.addComplaintByExcel);


module.exports = router;