const httpStatus = require("http-status");
const { User, Post } = require("../models");
const ApiError = require("../utils/ApiError");
/**
 * Create a post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = async (postBody) => {
  const user = await User.findById(postBody.user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No user found.");
  }
  const newPost = {
    title: postBody.title,
    user: postBody.user,
    body: postBody.body,
    status: postBody.status,
    images: postBody.images,
    datePosted: new Date(),
  };
  const post = await Post.create(newPost);
  await Post.populate(post, { path: "user" });
  return post;
};

/**
 * Query for post
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
  // const posts = await Post.paginate(filter, options);
  const posts = await Post.find()
    .populate("user")
    .populate("upVote")
    .populate("downVote")
    .populate("comments.user");
  return posts;
};

/**
 * Get post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getPostById = async (id) => {
  return await Post.findById(id)
    .populate("user")
    .populate("upVote")
    .populate("downVote")
    .populate("comments.user");
};
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const getPostByUserId = async (id) => {
  return await Post.findOne({ user: id })
    .populate("user")
    .populate("upVote")
    .populate("downVote")
    .populate("comments.user");
};

const getPostsByUserId = async (userId) => {
  return await Post.find({ user: userId })
    .populate("user")
    .populate("upVote")
    .populate("downVote")
    .populate("comments.user");
};
/**
 * Get user by id
 * @param {ObjectId} useId
 * @returns {Promise<Post>}
 */
const getPostsOfSingleUser = async (userId) => {
  return await getPostsByUserId(userId);
};
/**
 * Get user by id
 * @param {ObjectId} useId
 * @returns {Promise<Post>}
 */
const getPostsOfLoggedUser = async (userId) => {
  return await getPostsByUserId(userId);
};
/**
 * Update post by id
 * @param {*} postId
 * @param {*} postBody
 * @returns
 */
const updatePost = async (postId, postBody) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No post found.");
  }
  const updatePostBody = {
    body: postBody.body,
    images: postBody.images,
    dateUpdated: new Date(),
  };
  Object.assign(post, updatePostBody);
  await post.save();
  return await getPostById(postId);
};

/**
 * Delete post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const deletePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No post found");
  }
  if (post.user.toString() !== userId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "No authorize to delete this post!"
    );
  }
  await post.remove();
  return post;
};

/**
 * Post upvote post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const upVotePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No post found");
  }
  if (post.upVote.includes(userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You already up vote the post!");
  }
  if (post.downVote.includes(userId)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already down vote the post, you cannot upvote!"
    );
  }
  await post.upVote.push(userId);
  await post.save();
  return await getPostById(id);
};

/**
 * Post upvote post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const removeUpVotePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No post found");
  }
  const index = post.upVote.findIndex((upvote) => upvote.toString() === userId);
  if (index < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You have not up vote yet.");
  }
  await post.upVote.splice(index, 1);
  await post.save();
  return await getPostById(id);
};

/**
 * Post upvote post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const removeDownVotePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No post found");
  }
  const index = post.downVote.findIndex(
    (downvote) => downvote.toString() === userId
  );
  if (index < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You have not down vote yet.");
  }
  await post.downVote.splice(index, 1);
  await post.save();
  return await getPostById(id);
};
/**
 * Post downvote post by id
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const downVotePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No post found");
  }
  if (post.downVote.includes(userId)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already down vote the post!"
    );
  }
  if (post.upVote.includes(userId)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already up vote the post, you cannot downvote!"
    );
  }
  await post.downVote.push(userId);
  await post.save();
  return await getPostById(id);
};

const getDownVotes = async (id) => {
  const post = await Post.findById(id).populate("downVote");
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No post found");
  }
  const downvotes = post.downVote;
  return downvotes;
};
/**
 * Post Add Comment to a post
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const putComment = async (postId, userId, commentBody) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No post found");
  }
  const newComment = {
    user: userId,
    text: commentBody.text,
    img: commentBody.img,
    commentCreateDate: new Date(),
  };
  await post.comments.push(newComment);
  await post.save();
  return await getPostById(postId);
};

/**
 * Post Add Comment to a post
 * @param {ObjectId} id
 * @returns {Promise<Post>}
 */
const deleteComment = async (postId, userId, commentId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No post found");
  }
  const comment = post.comments.find((comment) => comment.id === commentId);
  if (!comment) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Comment not found!");
  }
  if (comment.user.toString() !== userId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Not authorize to delete comment."
    );
  }
  post.comments = post.comments.filter(({ id }) => id !== commentId);
  await post.save();
  return await getPostById(postId);
};
module.exports = {
  createPost,
  queryPosts,
  getPostByUserId,
  getPostById,
  getPostsOfLoggedUser,
  getPostsOfSingleUser,
  updatePost,
  deletePost,
  upVotePost,
  removeUpVotePost,
  downVotePost,
  removeDownVotePost,
  putComment,
  deleteComment,
};
