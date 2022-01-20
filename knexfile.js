const path = require('path');
const knexSnakeCaseMappers = require('objection');

const migrations = {
  directory: path.join(__dirname, 'server', 'migrations'),
};
console.log('migrations', migrations.directory);

const getSeeds = (env) => ({
  directory: path.join(__dirname, 'server', 'seeds', env),
});

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite',
    },
    useNullAsDefault: true,
    migrations,
    // debug: true,
    seeds: getSeeds('development'),
    ...knexSnakeCaseMappers,
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations,
    // debug: true,
    ...knexSnakeCaseMappers,
    // seeds: getSeeds('test'),
  },
  // production: {
  //     client: 'pg',
  //     connection: {
  //         filename: './database.sqlite',
  //     },
  //     useNullAsDefault: true,
  //     migrations,
  //     seeds: getSeeds('production'),
  // ...knexSnakeCaseMappers,
  // },
};
