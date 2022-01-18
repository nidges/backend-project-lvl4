export default (app) => {
  // { name: 'root' } требуется для fastify-reverse-routes
  app
    .get('/', { name: 'root' }, (req, reply) => {
      reply.render('welcome/index');
    })
    .get('/protected', { name: 'protected', preValidation: app.authenticate }, (req, reply) => {
      reply.render('welcome/index');
    });
};
