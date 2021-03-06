const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { postService } = require("../services");
const config = require("../config/config");

// Create post
const createPost = catchAsync(async (req, res) => {
  let createBody = req.body;
  createBody.user = req.user.id;
  const post = await postService.createPost(createBody);
  res.status(httpStatus.CREATED).send(post);
});

// Get All Posts
const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["firstName", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  options.populate = "user,comments.user";
  const result = await postService.queryPosts(filter, options);
  res.send(result);
});

// Get Single Post
const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
  }
  res.send(post);
});

// Get Post By User Id
const getPostByUserId = catchAsync(async (req, res) => {
  const post = await postService.getPostByUserId(req.params.id);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, "Post not found");
  }
  res.send(post);
});

const getPostsOfLoggedUser = catchAsync(async (req, res) => {
  const id = req.user.id;
  const posts = await postService.getPostsOfLoggedUser(id);
  console.log(posts.length);
  res.send(posts);
});
const getPostsOfSingleUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const posts = await postService.getPostsOfSingleUser(id);
  console.log(posts.length);
  res.send(posts);
});
// Update Post
const updatPost = catchAsync(async (req, res) => {
  let updatePostBody = req.body;
  const images = [];
  if (req.files)
    req.files.map((file) => {
      images.push(file.filename);
    });
  updatePostBody.images = images;
  updatePostBody.body = req.body.body;
  const post = await postService.updatePost(req.params.id, updatePostBody);
  res.send(post);
});

// Delete Post
const deletePost = catchAsync(async (req, res) => {
  const post = await postService.deletePost(req.params.id, req.user.id);
  res.json({ msg: "Post deleted succesfully." });
});

// Upvote Post
const upVotePost = catchAsync(async (req, res) => {
  const post = await postService.upVotePost(req.params.id, req.user.id);
  res.send(post);
});

// Remove Upvote Post
const removeUpVotePost = catchAsync(async (req, res) => {
  const post = await postService.removeUpVotePost(req.params.id, req.user.id);
  res.send(post);
});
// Downvote Post
const downVotePost = catchAsync(async (req, res) => {
  const post = await postService.downVotePost(req.params.id, req.user.id);
  res.send(post);
});

// Remove Downvote Post
const removeDownVotePost = catchAsync(async (req, res) => {
  const post = await postService.removeDownVotePost(req.params.id, req.user.id);
  res.send(post);
});
// Downvote Post
const putComment = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  let commentBody = req.body;
  let image = "";
  if (req.file) image = req.file.filename;
  commentBody.img = image;
  const post = await postService.putComment(postId, userId, commentBody);
  res.send(post);
});

// Downvote Post
const deleteComment = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.comment_id;
  const userId = req.user.id;
  const post = await postService.deleteComment(postId, userId, commentId);
  res.json({ msg: "Comment deleted successfully." });
});

module.exports = {
  createPost,
  getPost,
  getPostByUserId,
  getPosts,
  getPostsOfSingleUser,
  updatPost,
  deletePost,
  upVotePost,
  removeUpVotePost,
  downVotePost,
  removeDownVotePost,
  putComment,
  deleteComment,
  getPostsOfLoggedUser,
};
