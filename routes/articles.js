const express = require('express');
const router = express.Router();

const articlesData = require('../database/articles.js');
const articlesArray = articlesData.getArticlesArray();
const articlesObject = articlesData.getArticlesObject();

//
router
  .route('/')
  .get((req, res) => {
    articlesObject.message = '';
    res.status(200);
    return res.render('./templates/articles/index', articlesObject);
  })
  .post((req, res) => {
    let body = req.body;
    articlesData.postArticle(body);
    return res.render('./templates/articles/index', articlesObject);
  });

// /new

router.get('/new', (req, res) => {
  res.status(200);
  return res.render('./templates/articles/new', { message: '' });
});

// /edit

router.get('/:title/edit', (req, res) => {
  let params = req.params;
  const articleIndex = articlesData.findArticleTitle(params.title);

  const data = {
    title: articlesArray[articleIndex].title,
    author: articlesArray[articleIndex].author,
    body: articlesArray[articleIndex].body,
  };

  res.status(200);

  return res.render('./templates/articles/edit', data);
});

// /:title get

router.get('/:title', (req, res) => {
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

// /:title put
router.put('/:title', (req, res) => {
  const body = req.body;
  const params = req.params;
  const formattedParam = params.title
    .split(' ')
    .join('')
    .toLowerCase();
  const articleIndex = articlesData.findArticleTitle(params.title);

  for (var key in body) {
    articlesArray[articleIndex][key] = body[key];
  }

  res.status(200);
  return res.redirect(`./${formattedParam}`);
});
// title delete
router.delete('/:title', (req, res) => {
  const articleTitle = req.params.title;
  const articleIndex = articlesData.findArticleTitle(articleTitle);

  articlesArray.splice(articleIndex, 1);

  const articles = articlesData.getArticlesObject();
  articles.message = 'Deletion Successful';
  res.status(200);
  return res.redirect('./');
});

module.exports = router;
