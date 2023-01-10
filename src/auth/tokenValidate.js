const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seuSegredoAqui';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.payload = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
