const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/auth.controller');
const {register, login } = require('../helpers/auth/validation');
const tokenVerify = require('../middlewares/auth/tokenVerify');
router.post("/register", register, tokenVerify, authController.register);
router.post("/login", login, authController.login);

module.exports = router;