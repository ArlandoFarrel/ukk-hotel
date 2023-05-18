const express = require('express');
const router = express.Router();
const { refreshToken } = require('../controller/refreshtoken')
const authController = require('../controller/authController');
const verifyToken = require('../middleware/VerifyToken')
// Route untuk login
router.post('/login', authController.login);
router.get('/token', refreshToken)
router.delete('/logout', authController.logout)

module.exports = router;
