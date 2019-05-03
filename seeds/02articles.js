exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('articles')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('articles').insert([
        { id: 1, title: 'test', author: 'bananman', body: 'hello im banana' },
        { id: 2, title: 'loop', author: 'looper', body: 'heyo' },
        { id: 3, title: 'lmao', author: 'testauth', body: 'testbody' },
      ]);
    });
};
