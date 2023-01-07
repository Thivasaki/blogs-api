const express = require('express');
const { loginController } = require('../controllers');
const validateLoginFields = require('../middleware/validadeLoginFields');

const router = express.Router();

router.post('/login', validateLoginFields, loginController.LogIn);

module.exports = router;