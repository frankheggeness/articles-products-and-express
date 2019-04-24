const express = require('express');
const router = express.Router();
const middleware = require('../middleware/validator.js');
const articlesData = require('../database/articles.js');
const articlesArray = articlesData.getArticlesArray();
const articlesObject = articlesData.getArticlesObject();

router
  .route('/')
  .get((req, res) => {
    // articlesData.displayArticles(res);
    res.status(200);
    return res.render('./templates/articles/index', articlesObject);
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

router.get('/:title', middleware.validator, (req, res) => {
  const params = req.params;
  const articleIndex = articlesData.findArticleTitle(params.title);

  const data = {
    title: articlesArray[articleIndex].title,
    author: articlesArray[articleIndex].author,
    body: articlesArray[articleIndex].body,
  };

  res.status(200);
  return res.render('./templates/articles/article', data);
});

router.put('/:title', middleware.validator, (req, res) => {
  const params = req.params;
  const articleIndex = articlesData.findArticleTitle(params.title);

  const data = {
    title: articlesArray[articleIndex].title,
    author: articlesArray[articleIndex].author,
    body: articlesArray[articleIndex].body,
  };

  res.status(200);
  return res.render('./templates/articles/article', data);
});

module.exports = router;
