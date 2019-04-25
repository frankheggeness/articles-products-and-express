const express = require('express');
const router = express.Router();
const productsData = require('../database/products.js');
const middleware = require('../middleware/validator.js');
let productArray = productsData.getProductArray();
let productArrayLength = productArray.length;

router
  .route('/')
  .get((req, res) => {
    res.status(200);
    return res.render('./templates/products/index', productsData.getProductObject());
  })
  .post((req, res) => {
    let body = req.body;
    productsData.postProduct(body);
    res.status(200);
    return res.render('./templates/products/index', productsData.getProductObject());
  })
  .put((req, res) => {
    let body = req.body;
    productsData.putProduct(body, res);
  })
  .delete((req, res) => {
    let body = req.body;
    productsData.deleteProduct(body, res);
  });

router.get('/new', middleware.validator, (req, res) => {
  res.status(200);
  return res.render('./templates/products/index', productsData.getProductObject());
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
