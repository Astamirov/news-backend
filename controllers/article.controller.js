const Article = require("../models/Article.model");
const User = require("../models/User.model");

module.exports = {
  getArticles: async (req, res) => {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching articles", error: error.message });
    }
  },
  createArticle: async (req, res) => {
    try {
      const { imageUrl, category, date, title, text } = req.body;

      const newArticle = await Article.create({
        imageUrl,
        category,
        date,
        title,
        text,
      });

      res.status(201).json({ success: true, article: newArticle });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },
  getArticleById: async (req, res) => {
    try {
      const { articleId } = req.params;

      const article = await Article.findById(articleId);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res
        .status(500)
        .json({ message: "Error fetching article", error: error.message });
    }
  },

  addComment: async (req, res) => {
    try {
      const { articleId } = req.params;
      const { text } = req.body;

      const article = await Article.findById(articleId);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const comment = { text, author: user._id, username: user.login };

      article.comments.push(comment);
      await article.save();

      res.status(201).json({ success: true, comment });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  },

  deleteComment: async (req, res) => {
    const { articleId, commentId } = req.params;

    try {
      const article = await Article.findById(articleId);

      if (!article) {
        return res.status(404).json("Статья не найдена");
      }

      const comment = article.comments.id(commentId);

      if (!comment) {
        return res.status(404).json("Комментарий не найден");
      }

      if (comment.author.toString() === req.user.id) {
        article.comments.pull(comment);
        await article.save();
        return res.json("Комментарий удален");
      }

      return res.status(401).json("Ошибка. Нет доступа");
    } catch (e) {
      return res.status(400).json("Ошибка: " + e.toString());
    }
  },
};
