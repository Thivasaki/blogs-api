const { Category } = require('../models');

const createCategory = async (name) => {
  await Category.create(name);
  const newCategory = await Category.findOne({ where: name });

  return { type: null, message: newCategory };
};

module.exports = {
  createCategory,
};