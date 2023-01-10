const { User } = require('../models');
const { validateNewUser } = require('./validations/validateInputValues');
const { createToken } = require('../auth/jwtFunctions');

const createUser = async (user) => {
  const error = validateNewUser(user);
  if (error.type) {
    return error;
  }
  const userWithoutPassword = { email: user.email };

  const searchUser = await User.findOne({ where: userWithoutPassword });
  if (searchUser) {
    return { type: 'INPUT_ALREADY_EXIST', message: 'User already registered' };
  }
  await User.create(user);

  const token = createToken(userWithoutPassword);

  return { type: null, message: token };
};

const findAllUsers = async () => {
  const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return { type: null, message: users };
};

module.exports = {
  createUser,
  findAllUsers,
};