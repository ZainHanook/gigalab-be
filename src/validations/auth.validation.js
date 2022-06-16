const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required().description("First name is required"),
    lastName: Joi.string().required().description("Last name is required"),
    email: Joi.string().email().description("Email is required"),
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
module.exports = {
  register,
  login,
  logout,
};
