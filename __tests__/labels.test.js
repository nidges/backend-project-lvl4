import getApp from '../server/index.js';
import { authenticate, getTestData, prepareData } from './helpers';

describe('test labels CRUD', () => {
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
    cookies = await authenticate(app, testData.users.existing);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('labels'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newLabel'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.labels.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('labels'),
      payload: {
        data: params,
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);

    const label = await models.label.query().findOne({ name: params.name });
    expect(label).toMatchObject(params);
  });

  it('update', async () => {
    const oldParams = testData.labels.existing;
    const newParams = testData.labels.updated;
    // findOne выдает один объект, where выдает массив объектов
    const { id } = await models.label.query().findOne({ name: oldParams.name });

    const responseForm = await app.inject({
      method: 'GET',
      url: app.reverse('updateLabelForm', { id }),
      cookies,
    });
    expect(responseForm.statusCode).toBe(200);

    const responseUpdate = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateLabel', { id }),
      payload: {
        data: newParams,
      },
      cookies,
    });
    expect(responseUpdate.statusCode).toBe(302);

    const label = await models.label.query().findById(id);
    expect(label).toMatchObject(newParams);
  });

  it('delete', async () => {
    const params = testData.labels.existingEmpty;
    const { id } = await models.label.query().findOne({ name: params.name });

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('updateLabel', { id }),
      cookies,
    });

    expect(response.statusCode).toBe(302);

    expect(await models.label.query().findById(id)).toBeUndefined();
  });

  afterEach(async () => {
    // после каждого теста откатываем миграции
    await knex.migrate.rollback();
  });

  afterAll(() => {
    app.close();
  });
});
