const express = require('express');
const router = express.Router();
const productsData = require('../database/products.js');

let productArray = productsData.getProductArray();
let productArrayLength = productArray.length;

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

router.route(`/:id`).get((req, res) => {
  res.send(productArray);
});
// banana
module.exports = router;
