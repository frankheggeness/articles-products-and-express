(function banana() {
  let articleObject = {
    articles: [
      {
        title: 'test test test',
        body: '17 pages',
        author: '17 units',
        urlTitle: `${encodeURIComponent('test Title')}`,
      },
    ],
  };

  let articleArray = articleObject.articles;

  // find article
  const findArticleTitle = (title) => {
    let index = -1;
    let formattedTitle = title
      .split(' ')
      .join('')
      .toLowerCase();

    articleArray.forEach((article) => {
      if (
        article.title
          .split(' ')
          .join('')
          .toLowerCase() === formattedTitle
      ) {
        return (index = articleArray.indexOf(article));
      }
    });

    if (index < 0) {
      return false;
    }
    return index;
  };

  let getArticlesArray = () => {
    return articleArray;
  };
  let getArticlesObject = () => {
    return articleObject;
  };

  let postArticle = (body, res) => {
    let newArticle = {};
    newArticle['title'] = body['title'];
    newArticle['body'] = body['body'];
    newArticle['author'] = body['author'];
    newArticle['urlTitle'] = encodeURIComponent(newArticle.title);
    articleArray.push(newArticle);
    // res.send(articleArray);
  };

  module.exports = {
    getArticlesArray,
    postArticle,
    getArticlesObject,
    findArticleTitle,
  };
})();
