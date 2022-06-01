const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const getUsers = {
  query: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string().allow().optional(),
      lastName: Joi.string().allow().optional(),
      email: Joi.string().email().allow().optional(),
      userName: Joi.string().allow().optional(),
      password: Joi.string().allow().optional(),
      role: Joi.string().allow().optional(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
