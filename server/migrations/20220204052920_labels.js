// new changes
exports.up = (knex) => (
  knex.schema
    .createTable('labels', (table) => {
      table.increments();
      table.string('name');
      table.timestamps(true, true);
    })
);

exports.down = (knex) => (
  knex.schema
    .dropTableIfExists('labels')
);
