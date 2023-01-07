const { createToken } = require('../auth/jwtFunctions');
const { User } = require('../models');
const { validateLogin } = require('./validations/validateInputValues');

const logIn = async (login) => {
  const error = validateLogin(login);
  if (error.type) {
    return error;
  }

  const findUser = await User.findOne({ where: login });
  if (!findUser) {
    return { type: 'INPUT_INVALID', message: 'Invalid fields' };
  }

  const loginWithoutPassword = { email: login.email };
  const token = createToken(loginWithoutPassword);
  return { type: null, message: token };
};

module.exports = {
  logIn,
};