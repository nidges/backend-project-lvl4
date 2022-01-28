exports.seed = (knex) => knex('labels')
  .del()
  .then(() => knex('labels').insert([
    {
      name: 'label 1',
    },
    {
      name: 'label 2',
    },
    {
      name: 'label 3',
    },
    {
      name: 'label 4',
    },
  ]));
