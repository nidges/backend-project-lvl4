// new changes
exports.up = (knex) => (
  knex.schema
    .createTable('labels_tasks', (table) => {
      table.increments();
      table.integer('label_id').references('labels.id');
      table.integer('task_id').references('tasks.id');
    })
);

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('labels_tasks')
);
