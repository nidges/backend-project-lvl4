import getApp from '../server/index.js';
import { authenticate, getTestData, prepareData } from './helpers';

describe('test statuses CRUD', () => {
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
    await prepareData(app);
    cookies = await authenticate(app, testData);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.statuses.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses'),
      payload: {
        data: params,
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);

    const status = await models.status.query().findOne({ name: params.name });
    expect(status).toMatchObject(params);
  });

  it('update', async () => {
    const oldParams = testData.statuses.existing;
    const newParams = testData.statuses.updated;
    // findOne выдает один объект, where выдает массив объектов
    const { id } = await models.status.query().findOne({ name: oldParams.name });

    const responseForm = await app.inject({
      method: 'GET',
      url: app.reverse('updateStatusForm', { id }),
      cookies,
    });
    expect(responseForm.statusCode).toBe(200);

    const responseUpdate = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateStatus', { id }),
      payload: {
        data: newParams,
      },
      cookies,
    });
    expect(responseUpdate.statusCode).toBe(302);

    const status = await models.status.query().findById(id);
    expect(status).toMatchObject(newParams);
  });

  it('delete', async () => {
    const params = testData.statuses.existing;
    const { id } = await models.status.query().findOne({ name: params.name });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('updateStatus', { id }),
      cookies,
    });

    expect(response.statusCode).toBe(302);

    expect(await models.status.query().findById(id)).toBeUndefined();
  });

  afterEach(async () => {
    // после каждого теста откатываем миграции
    await knex.migrate.rollback();
  });

  afterAll(() => {
    app.close();
  });
});
