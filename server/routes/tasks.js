import i18next from 'i18next';

const getGraphPromises = (app) => ([
  app.objection.models.status.query(),
  app.objection.models.user.query(),
  app.objection.models.label.query(),
]);

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      const {
        status, executor, label, isCreatorUser,
      } = req.query;
      const query = app.objection.models.task.query().withGraphJoined('[status, creator, executor, labels]').orderBy('id');

      if (status) {
        query.modify('filterStatus', status);
      }
      if (executor) {
        query.modify('filterExecutor', executor);
      }
      if (label) {
        query.modify('filterLabel', label);
      }
      if (isCreatorUser) {
        query.modify('filterCreator', req.user.id);
      }

      const tasks = await query;
      const [statuses, executors, labels] = await Promise.all(getGraphPromises(app));

      reply.render('tasks/index', {
        tasks, statuses, executors, labels, query: req.query,
      });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const [statuses, executors, labels] = await Promise.all(getGraphPromises(app));

      reply.render('tasks/new', {
        task, statuses, executors, labels,
      });
      return reply;
    })
    .get('/tasks/:id', { name: 'viewTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id).withGraphJoined('[status, creator, executor, labels]');
      reply.render('tasks/view', { task });
      return reply;
    })
    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      const creatorId = req.user.id;
      req.body.data.labels = req.body.data.labels ? [...req.body.data.labels] : [];

      try {
        const { task } = app.objection.models;
        const newTask = task.fromJson({ ...req.body.data, creatorId });
        await task.transaction(async (trx) => {
          const thisTask = await task.query(trx).insert(newTask);
          const promises = req.body.data.labels.map((label) => thisTask
            .$relatedQuery('labels', trx)
            .relate(Number(label)));
          await Promise.all(promises);
        });

        req.flash('info', i18next.t('flash.tasks.create.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch (e) {
        if (e.type === 'ModelValidation' && e.data.statusId) {
          e.data.statusId[0].message = 'please provide a status';
        }
        const [statuses, executors, labels] = await Promise.all(getGraphPromises(app));

        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task: req.body.data, statuses, executors, labels, errors: e.data,
        });
        return reply;
      }
    })
    .get('/tasks/:id/edit', { name: 'updateTaskForm', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id).withGraphJoined('[status, creator, executor, labels]');
      const [statuses, executors, labels] = await Promise.all(getGraphPromises(app));

      reply.render('tasks/update', {
        task, statuses, executors, labels,
      });
      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const { task } = app.objection.models;
      const thisTask = await task.query().findById(id);
      const { creatorId } = thisTask;
      req.body.data.labels = req.body.data.labels ? [...req.body.data.labels] : [];

      try {
        const thisTaskUpd = task.fromJson({ ...req.body.data, creatorId });
        await task.transaction(async (trx) => {
          await thisTask
            .$relatedQuery('labels', trx)
            .unrelate();
          await thisTask.$query(trx).patch(thisTaskUpd);
          const promises = req.body.data.labels.map((label) => thisTask
            .$relatedQuery('labels', trx)
            .relate(Number(label)));
          await Promise.all(promises);
        });

        req.flash('info', i18next.t('flash.tasks.update.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch (e) {
        if (e.type === 'ModelValidation' && e.data.statusId) {
          e.data.statusId[0].message = 'please provide a status';
        }
        const [statuses, executors, labels] = await Promise.all(getGraphPromises(app));

        req.flash('error', i18next.t('flash.tasks.update.error'));
        reply.render('tasks/update', {
          task: { id, ...req.body.data }, statuses, executors, labels, errors: e.data,
        });
        return reply;
      }
    })
    .delete('/tasks/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const { task } = app.objection.models;
      const thisTask = await task.query().findById(id);
      const { creatorId } = thisTask;

      if (req.user.id !== creatorId) {
        req.flash('error', i18next.t('flash.tasks.delete.fail'));
        return reply.redirect(app.reverse('tasks'));
      }

      try {
        await task.transaction(async (trx) => {
          await thisTask
            .$relatedQuery('labels', trx)
            .unrelate();
          await thisTask.$query(trx).delete();
        });

        req.flash('info', i18next.t('flash.tasks.delete.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch (err) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        return reply.redirect(app.reverse('tasks'));
      }
    });
};
