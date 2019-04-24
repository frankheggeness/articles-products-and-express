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
    console.log(body);
    let newProduct = {};
    newProduct['name'] = body['name'];
    newProduct['price'] = body['price'];
    newProduct['inventory'] = body['inventory'];
    newProduct['id'] = productArray.length;
    productArray.push(newProduct);
    res.send(productArray);
  })
  .put((req, res) => {
    let body = req.body;
    let id = body['id'];
    if (id > productArray.length) {
      return res.send('id not found');
    }
    if (body.name) {
      productArray[id].name = body.name;
    }
    if (body.price) {
      productArray[id].price = body.price;
    }
    if (body.inventory) {
      productArray[id].inventory = body.inventory;
    }

    res.send(productArray);
  });
// banana
module.exports = router;
