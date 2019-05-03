const express = require('express');
const exphbs = require('express-handlebars');
const PORT = 3000;
const articles = require('./routes/articles.js');
const products = require('./routes/products.js');
const bodyParser = require('body-parser');
const fs = require('fs');
const analytics = require('./middleware/analytics.js');
const methodOverride = require('method-override');
const app = express();
const knex = require('./database');
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/articles', articles);
app.use('/products', products);

app.get('/', (req, res) => {
  res.render('./templates/main');
});

app.get('/search', (req, res) => {
  res.render('./search');
});

const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
