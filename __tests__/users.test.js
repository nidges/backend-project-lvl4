import _ from 'lodash';
import getApp from '../server/index.js';
import encrypt from '../server/lib/secure.js';
import { authenticate, getTestData, prepareData } from './helpers';

describe('test users CRUD', () => {
  let app;
  let knex;
  let models;
  let cookies;
  const testData = getTestData();

  beforeAll(async () => {
    app = await getApp();
    knex = app.objection.knex;
    models = app.objection.models;
  });

  beforeEach(async () => {
    // тесты не должны зависеть друг от друга
    // перед каждым тестом выполняем миграции
    // и заполняем БД тестовыми данными
    await knex.migrate.latest();
    // можно и так, но это не отделяет полностью папку тестов от остального проекта
    // await knex.seed.run();
    await prepareData(app);
    cookies = await authenticate(app, testData);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('users'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newUser'),
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.users.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('users'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, 'password'),
      passwordDigest: encrypt(params.password),
    };
    const user = await models.user.query().findOne({ email: params.email });
    expect(user).toMatchObject(expected);
  });

  it('update', async () => {
    const oldParams = testData.users.existing;
    const newParams = testData.users.updated;
    // findOne выдает один объект, where выдает массив объектов
    const { id } = await models.user.query().findOne('email', oldParams.email);

    const responseForm = await app.inject({
      method: 'GET',
      url: app.reverse('updateUserForm', { id }),
      cookies,
    });
    expect(responseForm.statusCode).toBe(200);

    const responseUpdate = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateUser', { id }),
      payload: {
        data: newParams,
      },
      cookies,
    });
    expect(responseUpdate.statusCode).toBe(302);

    const expected = {
      ..._.omit(newParams, 'password'),
      passwordDigest: encrypt(newParams.password),
    };
    const user = await models.user.query().findById(id);
    expect(user).toMatchObject(expected);
  });

  it('delete', async () => {
    const params = testData.users.existing;
    const { id } = await models.user.query().findOne('email', params.email);

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('updateUser', { id }),
      cookies,
    });

    expect(response.statusCode).toBe(302);

    expect(await models.user.query().findById(id)).toBeUndefined();
  });

  afterEach(async () => {
    // после каждого теста откатываем миграции
    await knex.migrate.rollback();
  });

  afterAll(() => {
    app.close();
  });
});
