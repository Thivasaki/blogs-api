const { categoryService } = require('../services');
const errorMap = require('../utils/errorMap');

const createCategory = async (req, res) => {
  const newCategory = req.body;
  const { type, message } = await categoryService.createCategory(newCategory);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(201).json(message);
};

module.exports = {
  createCategory,
};