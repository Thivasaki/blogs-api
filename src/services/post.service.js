const { BlogPost, User, PostCategory, Category } = require('../models');

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

module.exports = {
  createPost,
  findAllPost,
};