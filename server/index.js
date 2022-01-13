import Fastify from 'fastify';
import pointOfView from 'point-of-view';
import Pug from 'pug';
import path from 'path';
import fastifyStatic from 'fastify-static';

import router from './routes/root.js';

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
const isDevelopment = mode === 'development';

export default () => {
  const app = Fastify({
    logger: true,
  });
  const domain = isDevelopment ? 'http://0.0.0.0:5000' : '';

  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    root: path.join(__dirname, 'views'),
    propertyName: 'render',
    defaultContext: {
      assetPath: (filename) => `${domain}/assets/${filename}`,
    },
  });

  const pathPublic = isProduction
      ? path.join(__dirname, '..', 'public')
      : path.join(__dirname, '..', 'dist', 'public');

  app.register(fastifyStatic, {
    root: pathPublic,
    prefix: '/assets/',
    list: true,
  });

  router(app);

  return app;
};
