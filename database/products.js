(function banana() {
  let productObject = { products: [{ name: 'test', price: '17 dollars', inventory: '17 units' }] };
  let productArray = productObject.products;
  let getProductArray = () => {
    return productObject.products;
  };

  let postProduct = (body, res) => {
    let newProduct = {};
    newProduct['name'] = body['name'];
    newProduct['price'] = body['price'];
    newProduct['inventory'] = body['inventory'];
    newProduct['id'] = productArray.length;
    productArray.push(newProduct);
    res.send(productArray);
  };

  let putProduct = (body, res) => {
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
  };

  let deleteProduct = (body, res) => {
    let id = body['id'];
    if (id > productArray.length) {
      return res.send('id not found');
    }
    productArray.splice(id, 1);
    return res.redirect('/products');
  };

  module.exports = {
    getProductArray,
    postProduct,
    putProduct,
    deleteProduct,
  };
})();
