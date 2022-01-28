import {
  describe, beforeAll, it, expect,
} from '@jest/globals';
import dotenv from 'dotenv';
import path from 'path';
import getApp from '../server/index.js';

describe('requests', () => {
  let app;

  beforeAll(async () => {
    app = await getApp();

    dotenv.config({ debug: true, path: path.join(__dirname, '..', '.env.example') });

    console.log('process.env.SESSION_KEY inside tests', process.env.SESSION_KEY);
  });

  it('GET 200', async () => {
    const res = await app.inject({
      method: 'GET',
      url: app.reverse('root'),
    });
    expect(res.statusCode).toBe(200);
  });

  it('GET 404', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/wrong-path',
    });
    expect(res.statusCode).toBe(404);
  });

  afterAll(() => {
    app.close();
  });
});
