const { loginSchema, createUserSchema, idSchema } = require('./schema');

const validateLogin = (login) => {
  const { error } = loginSchema.validate(login);
  if (error) {
    return { type: 'INPUT_INVALID', message: 'Invalid fields' };
  }
  return { type: null, message: '' };
};

const validateNewUser = (user) => {
  const { error } = createUserSchema.validate(user);
  if (error) {
    return { type: 'INPUT_INVALID', message: error.message };
  }
  return { type: null, message: '' };
};

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) {
    return { type: 'INPUT_INVALID', message: error.message };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateLogin,
  validateNewUser,
  validateId,
};