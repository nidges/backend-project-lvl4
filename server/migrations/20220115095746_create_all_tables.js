// new changes
exports.up = (knex) => (
    knex.schema.createTable('users', (table) => {
            // table.increments('id').primary(); it should be primary key by default and 'id' by default
            table.increments();
            table.string('email');
            table.string('password_digest');
            table.string('first_name');
            table.string('last_name');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());

        //опция с зоной должна работать в постгресе, проверить
            // table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
            // table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
            // в чем разница? потом проверить. вроде также работает
            // table.timestamps(true, true);

    })
    // .createTable('tasks', (table) => {
    //         table.increments();
    //         table.integer('user_id').references('users.id');
    //         table.timestamps(true, true);
    // })
);


// rollback
// knex migrate:rollback --all
exports.down = (knex) => (
    knex.schema.dropTableIfExists('users')
    // .dropTable('tasks');
);

// sqlite3:
// sqlite3 database.sqlite
//     .tables
//     .schema tablename

