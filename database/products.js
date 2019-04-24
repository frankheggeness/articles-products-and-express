(function banana() {
  let productArray = [{ name: 'test', price: '17 dollars', inventory: '17 units' }];

  let getProductArray = () => {
    return productArray;
  };

  module.exports = {
    getProductArray,
  };
})();
