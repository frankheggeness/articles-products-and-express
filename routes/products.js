const express = require('express');
const router = express.Router();
const knex = require('../database/index');

router.get('/', (req, res) => {
  return knex
    .raw('SELECT * FROM products')
    .then((products) => {
      res.status(200);

      return res.render('./templates/products/index', products);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get('/new', (req, res) => {
  res.status(200);
  return res.render('./templates/products/new');
});

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
      // res.send(product[0]);
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
  let productId = req.params.product_id;
  return knex
    .raw('SELECT * FROM products WHERE id = ?', [productId])
    .then((product) => {
      if (!product || !product.rowCount) {
        res.status(404);
        throw `{Product NOT FOUND}`;
      }
      return knex.raw(
        `UPDATE products SET title = ?, description = ?, inventory = ?, price = ?  WHERE id = ? RETURNING *`,
        [inputData.title, inputData.description, inputData.inventory, inputData.price, product.rows[0].id],
      );
    })
    .then((newProduct) => {
      res.status(200);
      res.send(newProduct.rows);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete('/:product_id', (req, res) => {
  let productId = req.params.product_id;
  return knex
    .raw('SELECT * FROM products WHERE id = ?', [productId])
    .then((product) => {
      if (!product || !product.rowCount) {
        res.status(404);
        throw `{product NOT FOUND}`;
      }
      return knex.raw(`DELETE FROM products WHERE id = ? RETURNING *`, [productId]);
    })
    .then((newPass) => {
      res.status(200);
      res.send(`product ${productId} has been deleted`);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
