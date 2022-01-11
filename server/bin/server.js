#!/usr/bin/env node

import getApp from '../index.js';
import Fastify from "fastify";

// type module should be deleted from package.json????
// this file is NOT in bin in package.json

// const address = 'localhost';
const port = process.env.PORT || 5000;
const address = '0.0.0.0';
console.log('--->process.env.PORT', process.env.PORT);
const fastify = getApp();

fastify.listen(port, address, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    fastify.log.info(`server is listening on ${address}`);
})

// getApp().listen(port, address, () => console.log(`Listening on ${ port }`));
