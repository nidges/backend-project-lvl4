// new changes
exports.up = (knex) => (
  knex.schema
    .createTable('statuses', (table) => {
      table.increments();
      table.string('name');
      table.timestamps(true, true);
    })
);

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('statuses')
);
