const { User } = require('../models');
const { validateNewUser } = require('./validations/validateInputValues');
const { createToken } = require('../auth/jwtFunctions');

const createUser = async (user) => {
  const error = validateNewUser(user);
  if (error.type) {
    return error;
  }

  const searchUser = await User.findOne({ where: user });
  if (searchUser) {
    return { type: 'INPUT_ALREADY_EXIST', message: 'User already registered' };
  }
  await User.create(user);

  const token = createToken(user);

  return { type: null, message: token };
};

module.exports = {
  createUser,
};