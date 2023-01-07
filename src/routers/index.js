const express = require('express');
const { loginController } = require('../controllers');
const validateLoginFields = require('../middleware/validadeLoginFields');

const router = express.Router();

const userRouter = require('./user.router');

router.post('/login', validateLoginFields, loginController.LogIn);
router.use('/user', userRouter);

module.exports = router;