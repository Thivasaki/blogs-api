const express = require('express');
const { postController } = require('../controllers');
const validateToken = require('../auth/tokenValidate');
const validatePostFiels = require('../middleware/validatePostFields');

const router = express.Router();

router.post('/', validatePostFiels, validateToken, postController.createPost);
router.get('/', validateToken, postController.listPosts);

module.exports = router;