const mongoose = require("mongoose");
const commentsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      trime: true,
    },

    img: {
      type: String,
    },
    upVote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downVote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    commentCreateDate: {
      type: Date,
      default: new Date(),
    },
    commentUpdateDate: {
      type: Date,
      default: new Date(),
    },
  },
  { _id: true }
);

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      trime: true,
      required: true,
    },
    upVote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    downVote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    comments: [commentsSchema],
    datePosted: {
      type: Date,
      default: new Date(),
    },
    dateUpdated: {
      type: Date,
      default: new Date(),
    },
  },

  {
    timestamps: true,
  }
);
/**
 * @typedef Post
 */
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
