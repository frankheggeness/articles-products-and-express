(function banana() {
  let articleObject = {
    articles: [
      {
        title: 'The 17 Theorem: Alphabetical Iteration via Digit Manipulation ',
        body:
          'For millenia, scholars have unanimously concluded that cycling through the modern English alphabet was a purely verbal endeavor. However...',
        author: '十七様',
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
    articleObject.message = 'article made successfully';
    // res.send(articleArray);
  };

  module.exports = {
    getArticlesArray,
    postArticle,
    getArticlesObject,
    findArticleTitle,
  };
})();
