const { loginSchema } = require('./schema');

const validateLogin = (login) => {
  const { error } = loginSchema.validate(login);
  if (error) {
    return { type: 'INPUT_INVALID', message: 'Invalid fields' };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateLogin,
};