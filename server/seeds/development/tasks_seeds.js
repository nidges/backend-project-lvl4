exports.seed = (knex) => knex('tasks')
  .del()
  .then(() => knex('tasks').insert([
    {
      name: 'task1',
      description: 'some description',
      status_id: 1,
      creator_id: 1,
      executor_id: 1,
    },
    {
      name: 'task2',
      description: 'other description',
      status_id: 1,
      creator_id: 1,
    },
    {
      name: 'task3',
      description: 'then another description',
      status_id: 1,
      creator_id: 1,
      executor_id: 1,
    },
  ]));
