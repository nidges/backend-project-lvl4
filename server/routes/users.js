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
      // console.log('user.constructor.name--->', user.constructor.name);
      reply.render('users/new', { user });
    })
    .post('/users', async (req, reply) => {
      try {
        const user = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(user);
        req.flash('info', i18next.t('flash.users.create.success'));
        return reply.redirect(app.reverse('root'));
      } catch ({ data }) {
        console.log('errors--->', data);
        if (_.get(data, 'email[0].keyword') === 'pattern') {
          data.email[0].message = 'please provide a valid email';
        }
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', { user: req.body.data, errors: data });
        return reply;
      }
    })
    .get('/users/:id/edit', { name: 'updateUserForm', preValidation: app.authenticate }, async (req, reply) => {
      // если с валидацией все норм в req.user будет юзер который залогинен
      // if (!req.user) {
      //   req.flash('error', i18next.t('flash.authError'));
      //   return reply.redirect(app.reverse('root'));
      // }

      if (Number(req.params.id) !== Number(req.user.id)) {
        req.flash('error', i18next.t('flash.users.update.error'));
        return reply.redirect(app.reverse('users'));
      }

      const user = await app.objection.models.user.query().findById(req.user.id);
      reply.render('users/update', { user });
      return reply;
    })
    .patch('/users/:id', { name: 'updateUser', preValidation: app.authenticate }, async (req, reply) => {
      // console.log('req.user-------->', req.user);
      // console.log('req.body.data---->', req.body.data);
      const { id } = req.user;

      try {
        const user = await app.objection.models.user.query().findById(id);
        // const updatedUser = await user.$query().patchAndFetchById(id, req.body.data);
        await user.$query().patch(req.body.data);
        req.flash('info', i18next.t('flash.users.update.success'));
        return reply.redirect(app.reverse('users'));
      } catch ({ data }) {
        console.log('errors--->', data);
        if (_.get(data, 'email[0].keyword') === 'pattern') {
          data.email[0].message = 'please provide a valid email';
        }
        reply.render('users/update', { user: { id, ...req.body.data }, errors: data });
        return reply;
      }
    })
    .delete('/users/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.user;

      if (Number(req.params.id) !== id) {
        req.flash('error', i18next.t('flash.users.delete.error'));
        return reply.redirect(app.reverse('users'));
      }

      const createdTasks = await app.objection.models.task.query().where('creatorId', id);
      const assignedTasks = await app.objection.models.task.query().where('executorId', id);

      if (createdTasks.length !== 0 || assignedTasks.length !== 0) {
        req.flash('error', i18next.t('flash.users.delete.fail'));
        return reply.redirect(app.reverse('users'));
      }

      try {
        await app.objection.models.user.query().deleteById(id);
        await req.logOut();

        req.flash('info', i18next.t('flash.users.delete.success'));
        return reply.redirect(app.reverse('users'));
      } catch (err) {
        console.log('errors---->', err);
        req.flash('error', i18next.t('flash.users.delete.fail'));
        return reply.redirect(app.reverse('users'));
      }
    });
};
