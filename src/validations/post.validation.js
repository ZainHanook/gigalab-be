const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    status: Joi.string().required(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getPostsOfSingleUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    title: Joi.string().allow().optional(),
    body: Joi.string().allow().optional(),
    status: Joi.string().allow().optional(),
    upVote: Joi.array().allow().optional(),
    downVote: Joi.array().allow().optional(),
    comments: Joi.array().allow().optional(),
    datePosted: Joi.date().allow().optional(),
    dateUpdated: Joi.date().allow().optional(),
  }),
};

const deletePost = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const upVote = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
const downVote = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const putComment = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

module.exports = {
  createPost,
  getPost,
  getPostsOfSingleUser,
  updatePost,
  deletePost,
  upVote,
  downVote,
  putComment,
};
