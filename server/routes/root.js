export default (app) => {
  app
    .get('/', (request, reply) => {
      reply.render('welcome');
    })
    .get('/users', (request, reply) => {
      reply.render('welcome');
    });
};
