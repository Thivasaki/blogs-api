const { User } = require('../models');
const { validateNewUser, validateId } = require('./validations/validateInputValues');
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

const findUserById = async (id) => {
  const error = validateId(id);
  if (error.type) {
    return error;
  }
  const user = await User.findByPk(id);
  if (!user) {
    return { type: 'NOT_FOUND', message: 'User does not exist' };
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;
  return { type: null, message: userWithoutPassword };
};

const deleteUser = async (payload) => {
const user = await User.findOne({ where: payload.data });

await User.destroy(
  { where: { id: user.dataValues.id } },
);

return { type: null };
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  deleteUser,
};