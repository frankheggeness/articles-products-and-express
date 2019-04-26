(function banana() {
  let productObject = {
    products: [{ name: 'Bananas from 1717 17th Street', price: '17 dollars', inventory: '17 units', id: 17 }],
    message: '',
  };

  let productCounter = 18;

  let getProductArray = () => {
    return productObject.products;
  };

  let getProductObject = () => {
    return productObject;
  };

  let postProduct = (body) => {
    let newProduct = {};
    newProduct['name'] = body['name'];
    newProduct['price'] = body['price'];
    newProduct['inventory'] = body['inventory'];
    newProduct['id'] = productCounter;
    productCounter++;
    getProductArray().push(newProduct);
    productObject.message = 'product made successfully';
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

  let findProduct = (id) => {
    let productArray = getProductArray();
    let index = -1;
    productArray.forEach((product) => {
      if (product.id === parseInt(id)) {
        index = productArray.indexOf(product);
      }
    });
    return index;
  };

  module.exports = {
    getProductArray,
    postProduct,
    putProduct,
    deleteProduct,
    getProductObject,
    findProduct,
  };
})();
