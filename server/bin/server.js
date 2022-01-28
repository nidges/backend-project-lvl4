#!/usr/bin/env node

import Rollbar from 'rollbar';
import getApp from '../index.js';

const port = process.env.PORT || 5000;
const address = '0.0.0.0';
const fastify = getApp();

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  logLevel: 'debug',
});

fastify.listen(port, address, (err) => {
  if (err) {
    rollbar.error(err);
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`server is listening on port: ${port}`);
});
