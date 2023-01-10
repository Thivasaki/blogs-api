const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const createUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

module.exports = {
  loginSchema,
  createUserSchema,
  idSchema,
};