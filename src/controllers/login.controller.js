const { loginService } = require('../services');
const errorMap = require('../utils/errorMap');

const LogIn = async (req, res) => {
  const loginData = req.body;
  const { type, message } = await loginService.logIn(loginData);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(200).json({ token: message });
};

module.exports = {
  LogIn,
};