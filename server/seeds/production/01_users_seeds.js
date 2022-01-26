exports.seed = (knex) => knex('users')
  .del()
  .then(() => knex('users').insert([
    {
      first_name: 'Maria',
      last_name: 'Stepanova',
      email: 'mary@yandex.ru',
      password_digest: '434a20217d02deb3c4ee797d9bbbf4e325ff3ce33d52d1bccf59020e55e77108',
    },
    {
      first_name: 'Helen',
      last_name: 'Smith',
      email: 'helen@test.com',
      password_digest: '6915771be1c5aa0c886870b6951b03d7eafc121fea0e80a5ea83beb7c449f4ec',
    },
    {
      first_name: 'John',
      last_name: 'Smith',
      email: 'john@test.com',
      password_digest: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
    },
  ]));
