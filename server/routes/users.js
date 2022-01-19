import i18next from 'i18next';
import _ from 'lodash';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', { users });
      return reply;
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => {
      try {
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
        const user = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(user);
        // const myUser = await app.objection.models.user.query().where('email', req.body.data.email);
        // console.log('myUser-------->', myUser.password);
        req.flash('info', i18next.t('flash.users.create.success'));
        // console.log('----->', reply.flash());
        reply.redirect(app.reverse('root'));
        return reply;
      } catch ({ data }) {
        // console.log('errors--->', data);
        if (_.get(data, 'email[0].keyword') === 'pattern') {
          data.email[0].message = 'please provide a valid email';
        }
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user: req.body.data, errors: data });
        return reply;
      }
    })
    .patch('/users/:userId', { name: 'updateUser', preValidation: app.authenticate }, (req, reply) => {
      // если с валидацией все норм в req.user будет юзер который залогинен
      console.log('req.user', req.user);
    });
};
