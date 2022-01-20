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

// request object:
// console.log('req.body', req.body);
// console.log('req.query', req.query);
// console.log('req.params', req.params);
// console.log('req.headers', req.headers);
// console.log('req.raw', req.raw);
// console.log('req.server', req.server);
// console.log('req.id', req.id);
// console.log('req.ip', req.ip);
// console.log('req.ips', req.ips);
// console.log('req.hostname', req.hostname);
// console.log('req.protocol', req.protocol);
// console.log('req.url', req.url);
// console.log('req.routerMethod', req.routerMethod);
// console.log('req.routerPath', req.routerPath);
// при успешной аутентификации добавляется req.user с залогиненным юзером
// console.log('req.user', req.user);
