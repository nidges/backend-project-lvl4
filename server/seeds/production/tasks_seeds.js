exports.seed = (knex) => knex('tasks')
  .del()
  .then(() => knex('tasks').insert([
    {
      name: 'finish the project',
      description: '4 steps left',
      status_id: '2',
      creator_id: '1',
      executor_id: '1',
    },
    {
      name: 'write tasks crud tests',
      description: 'create-read-update-delete',
      status_id: '1',
      creator_id: '2',
    },
    {
      name: 'do not forget the linter!',
      status_id: '4',
      creator_id: '3',
      executor_id: '1',
    },
  ]));
