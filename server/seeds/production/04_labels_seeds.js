exports.seed = (knex) => knex('labels')
  .del()
  .then(() => knex('labels').insert([
    {
      name: 'low priority',
    },
    {
      name: 'blocker',
    },
    {
      name: 'technical debt',
    },
    {
      name: 'feature',
    },
  ]));
