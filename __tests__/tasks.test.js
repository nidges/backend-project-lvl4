import getApp from '../server/index.js';
import { authenticate, getTestData, prepareData } from './helpers';

describe('test tasks CRUD', () => {
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
    cookies = await authenticate(app, testData.users.existing);
  });

  it('index', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('tasks'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('view', async () => {
    const { id } = await models.task.query().findOne('id', '>', 0);
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('viewTask', { id }),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
      cookies,
    });

    expect(response.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.tasks.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      payload: {
        data: params,
      },
      cookies,
    });

    expect(response.statusCode).toBe(302);

    const task = await models.task.query().findById(4);
    expect(task).toMatchObject(params);
  });

  it('update', async () => {
    const oldParams = testData.tasks.existing;
    const newParams = testData.tasks.updated;
    // findOne выдает один объект, where выдает массив объектов
    const { id } = await models.task.query().findOne('name', oldParams.name);

    const responseForm = await app.inject({
      method: 'GET',
      url: app.reverse('updateTaskForm', { id }),
      cookies,
    });
    expect(responseForm.statusCode).toBe(200);

    const responseUpdate = await app.inject({
      method: 'PATCH',
      url: app.reverse('updateTask', { id }),
      payload: {
        data: newParams,
      },
      cookies,
    });
    expect(responseUpdate.statusCode).toBe(302);

    const task = await models.task.query().findById(id);
    expect(task).toMatchObject(newParams);
  });

  it('delete', async () => {
    const params = testData.tasks.existing;
    const { id } = await models.task.query().findOne('name', params.name);

    const response = await app.inject({
      method: 'DELETE',
      url: app.reverse('updateTask', { id }),
      cookies,
    });

    expect(response.statusCode).toBe(302);

    expect(await models.task.query().findById(id)).toBeUndefined();
  });

  afterEach(async () => {
    // после каждого теста откатываем миграции
    await knex.migrate.rollback();
  });

  afterAll(() => {
    app.close();
  });
});
