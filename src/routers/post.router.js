const express = require('express');
const { postController } = require('../controllers');
const validateToken = require('../auth/tokenValidate');
const validatePostFiels = require('../middleware/validatePostFields');
const validateUpdatePostFiels = require('../middleware/validateUpdatePostFields');

const router = express.Router();

router.post('/', validatePostFiels, validateToken, postController.createPost);
router.get('/', validateToken, postController.listPosts);
router.get('/:id', validateToken, postController.getPostById);
router.put('/:id', validateUpdatePostFiels, validateToken, postController.updatePost);

module.exports = router;