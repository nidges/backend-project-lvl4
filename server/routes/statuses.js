import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses', preValidation: app.authenticate }, async (req, reply) => {
      const statuses = await app.objection.models.status.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus', preValidation: app.authenticate }, (req, reply) => {
      const status = new app.objection.models.status();
      reply.render('statuses/new', { status });
    })
    .post('/statuses', { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const status = await app.objection.models.status.fromJson(req.body.data);
        await app.objection.models.status.query().insert(status);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        return reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        console.log('errors--->', data);
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status: req.body.data, errors: data });
        return reply;
      }
    })
    .get('/statuses/:id/edit', { name: 'updateStatusForm', preValidation: app.authenticate }, async (req, reply) => {
      const status = await app.objection.models.status.query().findById(req.params.id);
      reply.render('statuses/update', { status });
      return reply;
    })
    .patch('/statuses/:id', { name: 'updateStatus', preValidation: app.authenticate }, async (req, reply) => {
      // console.log('req.body.data---->', req.body.data);
      // console.log('req.params.id--->', req.params.id);
      const { id } = req.params;

      try {
        const status = await app.objection.models.status.query().findById(id);
        await status.$query().patch(req.body.data);
        req.flash('info', i18next.t('flash.statuses.update.success'));
        return reply.redirect(app.reverse('statuses'));
      } catch ({ data }) {
        console.log('errors--->', data);
        reply.render('statuses/update', { status: { id, ...req.body.data }, errors: data });
        return reply;
      }
    })
    .delete('/statuses/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const tasksInStatus = await app.objection.models.task.query().where('statusId', id);

      if (tasksInStatus.length !== 0) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        return reply.redirect(app.reverse('statuses'));
      }

      try {
        await app.objection.models.status.query().deleteById(id);

        req.flash('info', i18next.t('flash.statuses.delete.success'));
        return reply.redirect(app.reverse('statuses'));
      } catch (err) {
        console.log('errors---->', err);
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        return reply.redirect(app.reverse('statuses'));
      }
    });
};
