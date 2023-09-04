const express = require("express");
const articleController = require("../controllers/article.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/articles", articleController.getArticles);
router.post("/articles", articleController.createArticle);
router.post(
  "/articles/:articleId/comments",
  authMiddleware,
  articleController.addComment
);
router.get(
  "/articles/:articleId",
  authMiddleware,
  articleController.getArticleById
);
router.delete("/articles/:articleId/deleteComment/:commentId", authMiddleware, articleController.deleteComment);

module.exports = router;
