#!/usr/bin/env node

import getApp from '../index.js';

const port = process.env.PORT || 5000;
const address = '0.0.0.0';
const fastify = getApp();

fastify.listen(port, address, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`server is listening on port: ${port}`);
});
