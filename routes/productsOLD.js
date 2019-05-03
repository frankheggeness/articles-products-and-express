const express = require('express');
const router = express.Router();
const productsData = require('../database/products.js');

let productArray = productsData.getProductArray();
let productObject = productsData.getProductObject();
let productArrayLength = productArray.length;
const methodOverride = require('method-override');

router
  .route('/')
  .get((req, res) => {
    if (productObject.messageCheck === false) {
      productObject.message = '';
    } else {
      productObject.messageCheck = false;
    }
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
router.get('/new', (req, res) => {
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

router.get('/:id', (req, res) => {
  const params = req.params;
  const productIndex = productsData.findProduct(params.id);
  if (productIndex === -1) {
    productObject.message = 'ERROR: Cannot find product';
    productObject.messageCheck = true;
    return res.redirect('./');
  }

  const data = {
    name: productArray[productIndex].name,
    price: productArray[productIndex].price,
    inventory: productArray[productIndex].inventory,
    id: productArray[productIndex].id,
  };

  res.status(200);
  return res.render('./templates/products/product', data);
});

router.put('/:id', (req, res) => {
  const body = req.body;
  const params = req.params;
  const productIndex = productsData.findProduct(params.id);

  for (var key in body) {
    productArray[productIndex][key] = body[key];
  }

  res.status(200);
  return res.redirect(`./${params.id}`);
});

router.delete('/:id', (req, res) => {
  let params = req.params;
  const productIndex = productsData.findProduct(params.id);

  productArray.splice(productIndex, 1);
  const products = productsData.getProductObject();
  products.message = 'Deletion Successful';
  productObject.messageCheck = true;
  res.status(200);
  return res.redirect('./');
});

// banana
module.exports = router;
