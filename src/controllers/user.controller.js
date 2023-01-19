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

const listUsers = async (req, res) => {
  const { message } = await userService.findAllUsers();
  res.status(200).json(message);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.findUserById(id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(200).json(message);
};

const deleteUser = async (req, res) => {
  const { payload } = req;
  const { type, message } = await userService.deleteUser(payload);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(204).json();
};

module.exports = {
  createUser,
  listUsers,
  getUserById,
  deleteUser,
};