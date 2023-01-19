const express = require('express');
const { loginController } = require('../controllers');
const validateLoginFields = require('../middleware/validadeLoginFields');

const router = express.Router();

const userRouter = require('./user.router');
const categoryRouter = require('./catedory.router');
const postRouter = require('./post.router');

router.post('/login', validateLoginFields, loginController.LogIn);
router.use('/user', userRouter);
router.use('/categories', categoryRouter);
router.use('/post', postRouter);

module.exports = router;