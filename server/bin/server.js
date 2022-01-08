#!/usr/bin/env node

import getApp from '../index.js';
import express, {request} from 'express';
import Fastify from "fastify";

// type module should be deleted from package.json????
// this file is NOT in bin in package.json

// const address = 'localhost';
const port = process.env.PORT || 5000;
console.log('--->process.env.PORT', process.env.PORT);
// const fastify = getApp();

// fastify.listen(port, (err, address) => {
//     if (err) {
//         fastify.log.error(err);
//         process.exit(1);
//     }
//
//     console.log(`server is listening on ${address}`);
// })
// fastify.listen(port, () => {
//     console.log(`server is listening on ${port}`);
// })

const fastify = Fastify({
    logger: true
})

fastify
    .get('/', (request, reply) =>  {
        reply.send('hello!!!!!')
    })
    .listen(port, () => console.log(`Listening on ${ port }`))
