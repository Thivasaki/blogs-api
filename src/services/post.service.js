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
// Primeiro: extrair os elementos do parametro e adicionar no BlogPostBD
// Segundo: fazer um bulkCreate no PostCategoryDB
// Terceiro: retornar as novas informaçoes criadas
// Quarto: Validar se os categoryIds enviados realmente existem
  return { type: null, message: findNewPost };
};

module.exports = {
  createPost,
};