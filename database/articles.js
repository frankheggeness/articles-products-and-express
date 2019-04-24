(function banana() {
  let articleArray = [
    { title: 'test Title', body: '17 pages', author: '17 units', urlTitle: `${encodeURIComponent('test Title')}` },
  ];

  // const displayArticles = () => {
  //   res.render('main', articleArray);
  // };

  let getArticlesArray = () => {
    return articleArray;
  };

  let postArticle = (body, res) => {
    let newArticle = {};
    newArticle['title'] = body['title'];
    newArticle['body'] = body['body'];
    newArticle['author'] = body['author'];
    newArticle['urlTitle'] = encodeURIComponent(newArticle.title);
    articleArray.push(newArticle);
    res.send(articleArray);
  };

  let putArticle = (body, res) => {
    let title = body['title'];
    let index = -1;
    for (let i = 0; i < articleArray.length; i++) {
      if (articleArray[i].title === title) {
        index = i;
      }
    }
    if (index === -1) {
      return res.send('title not found');
    }

    if (body.title) {
      articleArray[index].title = body.title;
    }
    if (body.body) {
      articleArray[index].body = body.body;
    }
    if (body.author) {
      articleArray[index].author = body.author;
    }

    res.send(articleArray);
  };

  let deleteArticle = (body, res) => {
    let title = body['title'];
    let index = -1;
    for (let i = 0; i < articleArray.length; i++) {
      if (articleArray[i].title === title) {
        index = i;
      }
    }
    if (index === -1) {
      return res.send('title not found');
    }
    articleArray.splice(index, 1);
    return res.redirect('/articles');
  };

  module.exports = {
    getArticlesArray,
    postArticle,
    putArticle,
    deleteArticle,
  };
})();
