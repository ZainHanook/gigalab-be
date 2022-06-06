const Joi = require("joi");
const { join } = require("lodash");
const { objectId } = require("./custom.validation");

const createPost = {
  body: Joi.object().keys({
    body: Joi.string().required(),
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
    body: Joi.string().allow().optional(),
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
    postId: Joi.string().allow().optional(),
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
