const express = require('express');
const articleController = require('../controllers/article.controller');

const router = express.Router();

router.get('/articles', articleController.getArticles);
router.post('/articles', articleController.createArticle);

module.exports = router;