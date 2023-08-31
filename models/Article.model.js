const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  imageUrl: String,
  category: String,
  date: String,
  title: String,
  text: String
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;