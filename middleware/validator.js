const validator = (req, res, next) => {
  // articles
  if (req.originalUrl.slice(0, 9) === '/articles') {
    const title = req.params.title;
    const articleDB = require('../database/articles');
    const database = articleDB.getArticlesArray;

    // get title
    if (req.method === 'GET' && req.url === `/${title}`) {
      const params = req.params;
      const articleIndex = articleDB.findArticleTitle(params.title);
      if (typeof articleIndex !== 'number') {
        res.status(500);
        return res.send('error couldnt find title');
      }
    }
  }
  next();
};

module.exports = {
  validator,
};
