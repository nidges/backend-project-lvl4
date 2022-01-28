// new changes
exports.up = (knex) => (
    knex.schema
        .createTable('users', (table) => {
            // table.increments('id').primary(); it should be primary key by default and 'id' by default
            table.increments();
            table.string('email');
            table.string('password_digest');
            table.string('first_name');
            table.string('last_name');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
            // table.timestamps(true, false); // так пусто
            //опция с зоной должна работать в постгресе, проверить
            // table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
            // table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
            // в чем разница? потом проверить. вроде также работает
            // table.timestamps(true, true);

        })
        .createTable('statuses', (table) => {
            table.increments();
            table.string('name');
            table.timestamps(true, true);
        })
        .createTable('tasks', (table) => {
            table.increments();
            table.string('name');
            table.string('description');
            // table.integer('status_id').references('id').inTable('statuses');
            // table.integer('creator_id').references('id').inTable('users');
            // table.integer('executor_id').references('id').inTable('users');
            table.integer('status_id').references('statuses.id');
            table.integer('creator_id').references('users.id');
            table.integer('executor_id').references('users.id');
            table.timestamps(true, true);
        })
        .createTable('labels', (table) => {
            table.increments();
            table.string('name');
            table.timestamps(true, true);
        })
        .createTable('labels_tasks', (table) => {
            table.increments();
            table.integer('label_id').references('labels.id');
            table.integer('task_id').references('tasks.id');
        })
);


// rollback
// knex migrate:rollback --all
exports.down = (knex) => (
    knex.schema
        .dropTableIfExists('labels_tasks')
        .dropTableIfExists('tasks')
        .dropTableIfExists('labels')
        .dropTableIfExists('users')
        .dropTableIfExists('statuses')
);

// sqlite3:
// sqlite3 database.sqlite
//     .tables
//     .schema tablename

