exports.seed = (knex) => knex('users')
  .del()
  .then(() => knex('users').insert([
    {
      first_name: 'Maria',
      last_name: 'Stepanova',
      email: 'nidges1@yandex.ru',
      password_digest: '123abc',
    },
    {
      first_name: 'user1',
      last_name: 'user1surname',
      email: 'user1@test.com',
      password_digest: '123abc',
    },
    {
      first_name: 'user2',
      last_name: 'user2surname',
      email: 'user2@test.com',
      password_digest: '123abc',
    },
  ]));
