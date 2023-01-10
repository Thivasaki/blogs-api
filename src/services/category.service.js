const { Category } = require('../models');

const createCategory = async (name) => {
  await Category.create(name);
  const newCategory = await Category.findOne({ where: name });

  return { type: null, message: newCategory };
};

const findAllCategories = async () => {
  const users = await Category.findAll();
  return { type: null, message: users };
};

module.exports = {
  createCategory,
  findAllCategories,
};