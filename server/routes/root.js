export default (app) => {
  app.get('/', (request, reply) => {
    // console.log('inside route /');
    // reply.send({ hello: 'world' });
    // reply.send('hello world from task manager updated again');
    reply.render('welcome');
  })
    .get('/users', (request, reply) => {
      // console.log('inside route /');
      // reply.send({ hello: 'world' });
      // reply.send('hello world from task manager updated again');
      reply.render('welcome');
    });
};
