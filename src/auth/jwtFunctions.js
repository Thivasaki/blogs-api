const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seuSegredoAqui';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (dataInput) => {
  const token = jwt.sign({ data: dataInput }, secret, jwtConfig);
  return token;
};

module.exports = {
  createToken,
};
