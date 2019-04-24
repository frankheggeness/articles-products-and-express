const express = require('express');
const router = express.Router();
const productsData = require('../database/products.js');

let productArray = productsData.getProductArray();

router
  .route('/')
  .get((req, res) => {
    res.send(productArray);
  })
  .post((req, res) => {
    let body = req.body;
    productsData.postProduct(body, res);
  })
  .put((req, res) => {
    let body = req.body;
    productsData.putProduct(body, res);
  })
  .delete((req, res) => {
    let body = req.body;
    productsData.deleteProduct(body, res);
  });
// banana
module.exports = router;
