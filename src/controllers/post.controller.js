const { postService } = require('../services');
const errorMap = require('../utils/errorMap');

const createPost = async (req, res) => {
  const { body, payload } = req;
  const { type, message } = await postService.createPost(body, payload);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(201).json(message);
};

module.exports = {
  createPost,
};