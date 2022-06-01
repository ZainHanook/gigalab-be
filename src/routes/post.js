const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { postValidation } = require("../validations/index");
const { postController } = require("../controllers/index");
const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    [validate(postValidation.createPost)],
    postController.createPost
  )
  .get(auth(), postController.getPosts);

router
  .route("/:id")
  .get(auth(), validate(postValidation.getPost), postController.getPost)
  .patch(
    auth(),
    [validate(postValidation.updatePost)],
    postController.updatPost
  )
  .delete(
    auth(),
    validate(postValidation.deletePost),
    postController.deletePost
  );
router
  .route("/user/logged-user")
  .get(auth(), postController.getPostsOfLoggedUser);
router
  .route("/user-post/:id")
  .get(
    auth(),
    validate(postValidation.getPostsOfSingleUser),
    postController.getPostsOfSingleUser
  );

router
  .route("/upvote/:id")
  .post(auth(), validate(postValidation.upVote), postController.upVotePost);
router
  .route("/downvote/:id")
  .post(auth(), validate(postValidation.downVote), postController.downVotePost);

router
  .route("/upvote-remove/:id")
  .post(
    auth(),
    validate(postValidation.upVote),
    postController.removeUpVotePost
  );
router
  .route("/downvote-remove/:id")
  .post(
    auth(),
    validate(postValidation.downVote),
    postController.removeDownVotePost
  );

router
  .route("/comment/:id")
  .post(auth(), validate(postValidation.putComment), postController.putComment);

router
  .route("/comment/:id/:comment_id")
  .delete(
    auth(),
    validate(postValidation.deleteComment),
    postController.deleteComment
  );

module.exports = router;
