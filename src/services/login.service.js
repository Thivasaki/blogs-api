const { createToken } = require('../auth/jwtFunctions');
const { User } = require('../models');
const { validateLogin } = require('./validations/validateInputValues');

const logIn = async (data) => {
  const error = validateLogin(data);
  if (error.type) {
    return error;
  }

  const findUser = await User.findOne({ where: data });
  if (!findUser) {
    return { type: 'INPUT_INVALID', message: 'Invalid fields' };
  }

  const loginWithoutPassword = { email: data.email };
  const token = createToken(loginWithoutPassword);
  return { type: null, message: token };
};

module.exports = {
  logIn,
};