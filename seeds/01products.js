exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('products').insert([
        { id: 1, name: 'testName', price: 22.34, inventory: 23 },
        { id: 2, name: 'banana', price: 99.32, inventory: 13 },
        { id: 3, name: 'testo', price: 100.24, inventory: 100 },
      ]);
    });
};
