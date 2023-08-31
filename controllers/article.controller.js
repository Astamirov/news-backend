const Article = require('../models/Article.model');

module.exports = {
    getArticles: async (req, res) => {
        try {
          const articles = await Article.find();
          res.json(articles);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching articles', error: error.message });
        }
      },
    createArticle: async (req, res) => {
        try {
          const { imageUrl, category, date, title, text } = req.body;
      
          // Создание новой статьи в базе данных
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
          res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
      }
}

