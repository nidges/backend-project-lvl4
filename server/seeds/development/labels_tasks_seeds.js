exports.seed = (knex) => knex('labels_tasks')
  .del()
  .then(() => knex('labels_tasks').insert([
    {
      label_id: 1,
      task_id: 3,
    },
    {
      label_id: 1,
      task_id: 2,
    },
    {
      label_id: 2,
      task_id: 1,
    },
    {
      label_id: 3,
      task_id: 1,
    },
    {
      label_id: 1,
      task_id: 1,
    },
  ]));
