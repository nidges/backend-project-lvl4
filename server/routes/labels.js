import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels', preValidation: app.authenticate }, async (req, reply) => {
      const labels = await app.objection.models.label.query().orderBy('id');
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'newLabel', preValidation: app.authenticate }, async (req, reply) => {
      const label = new app.objection.models.label();
      reply.render('labels/new', { label });
      return reply;
    })
    .post('/labels', { preValidation: app.authenticate }, async (req, reply) => {
      try {
        const label = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(label);
        req.flash('info', i18next.t('flash.labels.create.success'));
        return reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('labels/new', { label: req.body.data, errors: data });
        return reply;
      }
    })
    .get('/labels/:id/edit', { name: 'updateLabelForm', preValidation: app.authenticate }, async (req, reply) => {
      const label = await app.objection.models.label.query().findById(req.params.id);
      reply.render('labels/update', { label });
      return reply;
    })
    .patch('/labels/:id', { name: 'updateLabel', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;

      try {
        const label = await app.objection.models.label.query().findById(id);
        await label.$query().patch(req.body.data);
        req.flash('info', i18next.t('flash.labels.update.success'));
        return reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        reply.render('labels/update', { label: { id, ...req.body.data }, errors: data });
        return reply;
      }
    })
    .delete('/labels/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const tasksWithLabel = await app.objection.models.label.relatedQuery('tasks').for(id);

      if (tasksWithLabel.length !== 0) {
        req.flash('error', i18next.t('flash.labels.delete.error'));
        return reply.redirect(app.reverse('labels'));
      }

      try {
        await app.objection.models.label.query().deleteById(id);

        req.flash('info', i18next.t('flash.labels.delete.success'));
        return reply.redirect(app.reverse('labels'));
      } catch (err) {
        req.flash('error', i18next.t('flash.labels.delete.error'));
        return reply.redirect(app.reverse('labels'));
      }
    });
};
