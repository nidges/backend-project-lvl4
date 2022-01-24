exports.seed = (knex) => knex('statuses')
  .del()
  .then(() => knex('statuses').insert([
    {
      name: 'new',
    },
    {
      name: 'in development',
    },
    {
      name: 'in testing',
    },
    {
      name: 'closed',
    },
  ]));
