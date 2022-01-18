import path from 'path';
import dotenv from 'dotenv';

import fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import fastifyErrorPage from 'fastify-error-page';
import fastifySensible from 'fastify-sensible';
import fastifyFormBody from 'fastify-formbody';
import qs from 'qs';
import { plugin as fastifyReverseRoutes } from 'fastify-reverse-routes';
import fastifyMethodOverride from 'fastify-method-override';
import fastifyObjectionJS from 'fastify-objectionjs';
import fastifyPassport from 'fastify-passport';
import fastifySecureSession from 'fastify-secure-session';

import Pug from 'pug';
import pointOfView from 'point-of-view';
import i18next from 'i18next';
import ru from './locales/ru.js';

import addRoutes from './routes/index.js';
import getHelpers from './helpers/index.js';
import knexConfig from '../knexfile.js';
import models from './models/index.js';
import FormStrategy from './lib/passportStrategies/FormStrategy.js';

dotenv.config();
const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
const isDevelopment = mode === 'development';

const registerViewsPlugin = (app) => {
  const domain = isDevelopment ? 'http://0.0.0.0:5000' : '';
  const helpers = getHelpers(app);

  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    includeViewExtension: true,
    // root: path.join(__dirname, 'views'),
    // propertyName: 'render',
    templates: path.join(__dirname, '..', 'server', 'views'),
    defaultContext: {
      ...helpers,
      // assetPath: (filename) => `${domain}/assets/${filename}`,
      // text: (key) => i18next.t(key),
      // text(key) {
      //   return i18next.t(key);
      // },
      assetPath(filename) {
        return `${domain}/assets/${filename}`;
      },
    },
  });

  // необходимо именно добавлять декоратор, иначе не заработает flash в пуге
  app.decorateReply('render', function render(viewPath, locals) {
    this.view(viewPath, { ...locals, reply: this });
  });
};

const registerStaticPlugin = (app) => {
  const pathPublic = isProduction
    ? path.join(__dirname, '..', 'public')
    : path.join(__dirname, '..', 'dist', 'public');

  app.register(fastifyStatic, {
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
        // en,
      },
    });
};

const addHooks = (app) => {
  // this is for point of view. isAuthenticated() is now available in pug
  app.addHook('preHandler', async (req, reply) => {
    reply.locals = {
      isAuthenticated: () => req.isAuthenticated(),
    };
  });
};

const registerMainPlugins = (app) => {
  app.register(fastifySensible);
  app.register(fastifyErrorPage);
  app.register(fastifyReverseRoutes);
  // app.register(fastifyFormBody);
  // парсер ниже нужен для вложенных объектов
  app.register(fastifyFormBody, { parser: qs.parse });

  app.register(fastifySecureSession, {
    secret: process.env.SESSION_KEY,
    cookie: {
      path: '/',
    },
  });

  fastifyPassport.registerUserDeserializer(
    (user) => app.objection.models.user.query().findById(user.id),
  );
  fastifyPassport.registerUserSerializer((user) => Promise.resolve(user));
  fastifyPassport.use(new FormStrategy('form', app));
  app.register(fastifyPassport.initialize());
  app.register(fastifyPassport.secureSession());
  app.decorate('fp', fastifyPassport);
  app.decorate('authenticate', (...args) => fastifyPassport.authenticate(
    'form',
    {
      failureRedirect: app.reverse('root'),
      failureFlash: i18next.t('flash.authError'),
    },
  )(...args));

  app.register(fastifyMethodOverride);
  app.register(fastifyObjectionJS, {
    knexConfig: knexConfig[mode],
    models,
  });
};

export default () => {
  const app = fastify({
    // logger: {
    //   prettyPrint: isDevelopment,
    // },
    logger: true,
  });

  registerMainPlugins(app);

  setupLocalization();
  registerViewsPlugin(app);
  registerStaticPlugin(app);

  addRoutes(app);
  addHooks(app);

  return app;
};
