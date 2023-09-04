const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Связь с моделью User
    required: true,
  },
  username: String,
});

const articleSchema = new mongoose.Schema({
  id: String,
  imageUrl: String,
  category: String,
  date: String,
  title: String,
  text: String,
  comments: [commentSchema], 
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;