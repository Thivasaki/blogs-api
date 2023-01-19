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

const listPosts = async (req, res) => {
  const { message } = await postService.findAllPost();
  res.status(200).json(message);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.findPostById(id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(200).json(message);
};

const updatePost = async (req, res) => {
  const { body, payload, params } = req;
  const { type, message } = await postService.updatePostById(body, payload, params.id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(200).json(message);
};

const deletePost = async (req, res) => {
  const { payload, params } = req;
  const { type, message } = await postService.deletePost(payload, params.id);
  if (type) {
    console.log(message);
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(204).json();
};

module.exports = {
  createPost,
  listPosts,
  getPostById,
  updatePost,
  deletePost,
};