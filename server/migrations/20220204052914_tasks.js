// new changes
exports.up = (knex) => (
    knex.schema
        .createTable('tasks', (table) => {
            table.increments();
            table.string('name');
            table.string('description');
            table.integer('status_id').references('statuses.id');
            table.integer('creator_id').references('users.id');
            table.integer('executor_id').references('users.id');
            table.timestamps(true, true);
        })
);

exports.down = (knex) => (
    knex.schema
        .dropTableIfExists('tasks')
);
