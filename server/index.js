import path from 'path';

import Fastify from 'fastify';
import fastifyStatic from 'fastify-static';

import Pug from 'pug';
import pointOfView from 'point-of-view';
import i18next from 'i18next';
import ru from './locales/ru.js';
import en from './locales/en.js';

import router from './routes/root.js';
// import getHelpers from './helpers/index.js';

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
const isDevelopment = mode === 'development';

const registerViewsPlugin = (fastify) => {
  const domain = isDevelopment ? 'http://0.0.0.0:5000' : '';
  // const helpers = getHelpers(fastify);

  fastify.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    root: path.join(__dirname, 'views'),
    propertyName: 'render',
    defaultContext: {
      // ...helpers,
      // assetPath: (filename) => `${domain}/assets/${filename}`,
      // text: (key) => i18next.t(key),
      text(key) {
        return i18next.t(key);
      },
      assetPath(filename) {
        return `${domain}/assets/${filename}`;
      },
    },
  });
};

const registerStaticPlugin = (fastify) => {
  const pathPublic = isProduction
    ? path.join(__dirname, '..', 'public')
    : path.join(__dirname, '..', 'dist', 'public');

  fastify.register(fastifyStatic, {
    root: pathPublic,
    prefix: '/assets/',
    list: true,
  });
};

const setupLocalization = () => {
  i18next
    .init({
      lng: 'ru',
      fallbackLng: 'en',
      // debug: isDevelopment,
      resources: {
        ru,
        en,
      },
    });
};

export default () => {
  const fastify = Fastify({
    logger: true,
  });

  setupLocalization();
  registerViewsPlugin(fastify);
  registerStaticPlugin(fastify);

  router(fastify);

  return fastify;
};
