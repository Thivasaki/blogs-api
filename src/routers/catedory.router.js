const express = require('express');
const { categoryController } = require('../controllers');
const validateToken = require('../auth/tokenValidate');
const validateCategory = require('../middleware/validateCategoryFields');

const router = express.Router();

router.post('/', validateToken, validateCategory, categoryController.createCategory);

module.exports = router;