export default (app) => {
    app.get('/', (request, reply) => {
        console.log('inside route /');
        reply.send({ hello: 'world' });
    })
}

