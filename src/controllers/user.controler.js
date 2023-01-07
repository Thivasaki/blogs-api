const { userService } = require('../services');
const errorMap = require('../utils/errorMap');

const createUser = async (req, res) => {
  const user = req.body;
  const { type, message } = await userService.createUser(user);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(201).json({ token: message });
};

module.exports = {
  createUser,
};