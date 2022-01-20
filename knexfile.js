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
  production: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
    // connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations,
    seeds: getSeeds('production'),
    ...knexSnakeCaseMappers,
  },
};
