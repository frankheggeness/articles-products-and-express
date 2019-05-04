const express = require('express');
const router = express.Router();
const knex = require('../database/index');

router.get('/', (req, res) => {
  return knex
    .select('*')
    .from('articles')
    .then((articles) => {
      let returnObj = { rows: articles };
      res.status(200);

      return res.render('./templates/articles/index', returnObj);
    })
    .catch((err) => {
      res.send(err);
    });
});

// new route

router.get('/new', (req, res) => {
  res.status(200);
  return res.render('./templates/articles/new');
});

// edit route
router.get('/:article_title/edit', (req, res) => {
  let articleTitle = req.params.article_title;
  return knex
    .select('*')
    .from('articles')
    .where({ title: articleTitle })
    .then((article) => {
      if (!article) {
        res.status(404);
        throw `{article NOT FOUND}`;
      }
      return article;
    })
    .then((article) => {
      res.status(200);
      return res.render('./templates/articles/edit', article[0]);
    })
    .catch((err) => {
      res.send('er' + err);
    });
});

// find article title function
const findArticleTitle = (title) => {
  let index = -1;
  let formattedTitle = title
    .split(' ')
    .join('')
    .toLowerCase();
  return formattedTitle;
};

// get article id

router.get('/:article_title', (req, res) => {
  let articleId = req.params.article_title;

  return knex
    .select('*')
    .from('articles')
    .where({ title: articleId })
    .then((article) => {
      if (!article) {
        res.status(404);
        throw `{article NOT FOUND}`;
      }
      return article;
    })
    .then((article) => {
      res.status(200);
      return res.render('./templates/articles/article', article[0]);
    })
    .catch((err) => {
      res.send('er' + err);
    });
});

// post route

router.post('/', (req, res) => {
  let idNum;
  knex
    .select('id')
    .from('articles')
    .then((ids) => {
      idNum = ids.length + 1;
    });
  let inputData = req.body;
  return knex
    .select('title')
    .from('articles')
    .where({ title: inputData.title })
    .then((article) => {
      if (!article || !article.rowCount) {
        return knex('articles')
          .insert({
            title: inputData.title,
            author: inputData.author,
            body: inputData.body,
            id: idNum,
          })
          .returning('*');
      }
      res.status(400);
      throw `{article EXISTS}`;
    })
    .then((madearticle) => {
      res.status(200);
      return res.redirect(`/articles/${madearticle[0].title}`);
    })
    .catch((err) => {
      res.send('ERR' + err);
    });
});

router.put('/:article_title', (req, res) => {
  let inputData = req.body;
  return knex
    .select('title')
    .from('articles')
    .where({ title: inputData.title })
    .then((article) => {
      if (article || article.rowCount) {
        return knex('articles')
          .update({
            title: inputData.title,
            author: inputData.author,
            body: inputData.body,
          })
          .returning('*');
      }
      res.status(400);
      throw `{article doesnt EXIST}`;
    })
    .then((madearticle) => {
      res.status(200);
      return res.redirect(`/articles/${madearticle[0].title}`);
    })
    .catch((err) => {
      res.send('ERR' + err);
    });
});

router.delete('/:article_title', (req, res) => {
  let articleTitle = req.params.article_title;
  return knex
    .select('title')
    .from('articles')
    .where({ title: articleTitle })
    .then((article) => {
      if (article || article.rowCount) {
        return knex('articles')
          .where({ title: articleTitle })
          .del();
      }
      res.status(400);
      throw `{article doesnt EXIST}`;
    })
    .then((madearticle) => {
      res.status(200);
      return res.redirect(`/articles`);
    })
    .catch((err) => {
      res.send('ERR' + err);
    });
});

module.exports = router;
