const express = require('express');
const { userController } = require('../controllers');
const validateToken = require('../auth/tokenValidate');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', validateToken, userController.listUsers);
router.get('/:id', validateToken, userController.getUserById);

module.exports = router;