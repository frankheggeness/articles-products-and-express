const express = require('express');
const exphbs = require('express-handlebars');
const PORT = 3000;
const articles = require('./routes/articles.js');
const products = require('./routes/products.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use('/articles', articles);
app.use('/products', products);

const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
