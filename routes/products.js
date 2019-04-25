const express = require('express');
const router = express.Router();
const productsData = require('../database/products.js');
const middleware = require('../middleware/validator.js');
let productArray = productsData.getProductArray();
let productObject = productsData.getProductObject();
let productArrayLength = productArray.length;
const methodOverride = require('method-override');

router
  .route('/')
  .get((req, res) => {
    productObject.message = '';
    res.status(200);
    return res.render('./templates/products/index', productsData.getProductObject());
  })
  .post((req, res) => {
    let body = req.body;
    productsData.postProduct(body);
    res.status(200);
    return res.render('./templates/products/index', productsData.getProductObject());
  });

// /new
router.get('/new', middleware.validator, (req, res) => {
  res.status(200);
  return res.render('./templates/products/new', productsData.getProductObject());
});

router.post('/new', (req, res) => {
  let body = req.body;
  productsData.postProduct(body);
  res.status(200);
  return res.render('./templates/products/index', productsData.getProductObject());
});

// /edit

router.get('/:id/edit', (req, res) => {
  let params = req.params;
  const productIndex = productsData.findProduct(params.id);

  const data = {
    name: productArray[productIndex].name,
    price: productArray[productIndex].price,
    inventory: productArray[productIndex].inventory,
    id: productArray[productIndex].id,
  };

  res.status(200);

  return res.render('./templates/products/edit', data);
});

router.get('/:id', middleware.validator, (req, res) => {
  const params = req.params;
  const productIndex = productsData.findProduct(params.id);

  const data = {
    name: productArray[productIndex].name,
    price: productArray[productIndex].price,
    inventory: productArray[productIndex].inventory,
    id: productArray[productIndex].id,
  };

  res.status(200);
  return res.render('./templates/products/product', data);
});

router.put('/:id', middleware.validator, (req, res) => {
  const body = req.body;
  const params = req.params;
  const productIndex = productsData.findProduct(params.id);

  for (var key in body) {
    productArray[productIndex][key] = body[key];
  }

  res.status(200);
  return res.redirect(`./${params.id}`);
});

router.delete('/:id', middleware.validator, (req, res) => {
  // const Title = req.params.title;
  let params = req.params;
  const productIndex = productsData.findProduct(params.id);

  productArray.splice(productIndex, 1);

  const products = productsData.getProductObject();
  products.message = 'Deletion Successful';
  res.status(200);
  return res.render('./templates/products/index', products);
});

// banana
module.exports = router;
