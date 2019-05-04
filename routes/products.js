const express = require('express');
const router = express.Router();
const knex = require('../database/index');

router.get('/', (req, res) => {
  return knex
    .select('*')
    .from('products')
    .then((products) => {
      let returnObj = { rows: products };
      res.status(200);

      return res.render('./templates/products/index', returnObj);
    })
    .catch((err) => {
      res.send(err);
    });
});

// new route

router.get('/new', (req, res) => {
  res.status(200);
  return res.render('./templates/products/new');
});

// edit route
router.get('/:product_id/edit', (req, res) => {
  let productId = req.params.product_id;
  return knex
    .select('*')
    .from('products')
    .where({ id: productId })
    .then((product) => {
      if (!product) {
        res.status(404);
        throw `{PRODUCT NOT FOUND}`;
      }
      return product;
    })
    .then((product) => {
      res.status(200);
      return res.render('./templates/products/edit', product[0]);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get product id

router.get('/:product_id', (req, res) => {
  let productId = req.params.product_id;
  return knex
    .select('*')
    .from('products')
    .where({ id: productId })
    .then((product) => {
      if (!product) {
        res.status(404);
        throw `{PRODUCT NOT FOUND}`;
      }
      return product;
    })
    .then((product) => {
      res.status(200);
      return res.render('./templates/products/product', product[0]);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/', (req, res) => {
  let idNum;
  knex
    .select('id')
    .from('products')
    .then((ids) => {
      idNum = ids.length + 1;
    });
  let inputData = req.body;
  return knex
    .select('name')
    .from('products')
    .where({ name: inputData.name })
    .then((product) => {
      if (!product || !product.rowCount) {
        return knex('products')
          .insert({
            name: inputData.name,
            price: inputData.price,
            inventory: inputData.inventory,
            id: idNum,
          })
          .returning('*');
      }
      res.status(400);
      throw `{product EXISTS}`;
    })
    .then((madeProduct) => {
      res.status(200);
      // res.send(madeProduct);
      return res.redirect(`/products/${madeProduct[0].id}`);
    })
    .catch((err) => {
      res.send('ERR' + err);
      // res.send(idNum);
    });
});

router.put('/:product_id', (req, res) => {
  let inputData = req.body;
  return knex
    .select('name')
    .from('products')
    .where({ name: inputData.name })
    .then((product) => {
      if (product || product.rowCount) {
        return knex('products')
          .update({
            name: inputData.name,
            price: inputData.price,
            inventory: inputData.inventory,
          })
          .returning('*');
      }
      res.status(400);
      throw `{product doesnt EXIST}`;
    })
    .then((madeProduct) => {
      res.status(200);
      return res.redirect(`/products/${madeProduct[0].id}`);
    })
    .catch((err) => {
      res.send('ERR' + err);
    });
});

router.delete('/:product_id', (req, res) => {
  let inputData = req.body;
  let productId = req.params.product_id;
  return knex
    .select('id')
    .from('products')
    .where({ id: productId })
    .then((product) => {
      if (!product || !product.rowCount) {
        return knex('products')
          .where({ id: productId })
          .del();
      }
      res.status(400);
      throw `{product EXISTS}`;
    })
    .then((madeProduct) => {
      res.status(200);
      return res.redirect(`/products`);
    })
    .catch((err) => {
      res.send('ERR' + err);
    });
});

module.exports = router;
