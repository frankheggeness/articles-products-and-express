const express = require('express');
const router = express.Router();
const articlesData = require('../database/articles.js');
const articlesArray = articlesData.getArticlesArray();

router
  .route('/')
  .get((req, res) => {
    // articlesData.displayArticles(res);
  })
  .post((req, res) => {
    let body = req.body;
    return articlesData.postArticle(body, res);
    // res.send('Added something');
  })
  .put((req, res) => {
    let body = req.body;
    return articlesData.putArticle(body, res);
    // res.send('Update about me');
  })
  .delete((req, res) => {
    let body = req.body;
    return articlesData.deleteArticle(body, res);
  });

module.exports = router;
