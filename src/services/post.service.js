const { BlogPost, User, PostCategory, Category } = require('../models');
const { validateId } = require('./validations/validateInputValues');

const createPost = async (post, payload) => {
  const { title, content, categoryIds } = post;
  const findUser = await User.findOne({ where: payload.email });

  const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
  if (count !== categoryIds.length) {
    return { type: 'INPUT_REQUIRED', message: 'one or more "categoryIds" not found' };
  }

  await BlogPost.create({ title, content, userId: findUser.dataValues.id });
  const findNewPost = await BlogPost.findOne({ where: { title, content } });

  const templatePostCategoryDB = categoryIds.map((catId) => {
    const templateElement = {
      postId: findNewPost.dataValues.id, 
      categoryId: catId,
    };
    return templateElement;
  });
  await PostCategory.bulkCreate(templatePostCategoryDB);
  return { type: null, message: findNewPost };
};

const findAllPost = async () => {
  const allPosts = await BlogPost.findAll({ include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  return { type: null, message: allPosts };
};

const findPostById = async (id) => {
  const error = validateId(id);
  if (error.type) {
    return error;
  }
  const post = await BlogPost.findByPk(id, { include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  if (!post) {
    return { type: 'NOT_FOUND', message: 'Post does not exist' };
  }

  return { type: null, message: post };
};

const updatePostById = async (postUpdate, payload, postId) => {
  const { title, content } = postUpdate;

  const findUser = await User.findOne({ where: payload.data });
  const findPost = await BlogPost.findByPk(postId);
  console.log(findUser);
  if (findUser.dataValues.id !== findPost.dataValues.userId) {
    return { type: 'UNAUTHORIZED_USER', message: 'Unauthorized user' };
  }

  await BlogPost.update(
    { title, content },
    { where: { id: postId } },
  );

  const updatedPost = await BlogPost.findByPk(postId, { include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }] });

  return { type: null, message: updatedPost };
};

module.exports = {
  createPost,
  findAllPost,
  findPostById,
  updatePostById,
};