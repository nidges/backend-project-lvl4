export default (app) => {
  // { name: 'root' } требуется для fastify-reverse-routes
  app
    .get('/', { name: 'root' }, (req, reply) => {
      reply.render('welcome/index');
    })
  // preValidation is a fastify route option
    .get('/protected', { name: 'protected', preValidation: app.authenticate }, (req, reply) => {
      reply.render('welcome/index');
    });
};
