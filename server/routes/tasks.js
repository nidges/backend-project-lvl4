import i18next from 'i18next';
import _ from 'lodash';

const normalizeReqData = (reqData, initialAcc = {}) => {
  const entries = Object.entries(reqData);
  const normalizeText = (value) => value;
  const normalizeId = (value) => (value ? Number(value) : null);
  const normalizers = {
    name: normalizeText,
    description: normalizeText,
    statusId: normalizeId,
    executorId: normalizeId,
    creatorId: normalizeId,
    // labels: (value) => [...value].map(item => ({ id: Number(item) }))
  };
  return entries.reduce((acc, [key, value]) => ({
    [key]: normalizers[key](value),
    ...acc,
  }), initialAcc);
};

export default (app) => {
  app
    .get('/tasks', { name: 'tasks', preValidation: app.authenticate }, async (req, reply) => {
      const tasks = await app.objection.models.task.query().withGraphJoined('[status, creator, executor]').orderBy('id');
      reply.render('tasks/index', { tasks });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = new app.objection.models.task();
      const statuses = await app.objection.models.status.query();
      const executors = await app.objection.models.user.query();
      const labels = await app.objection.models.label.query();
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
      const { labels: reqLabels, ...rest } = req.body.data;
      const normalizedReqData = normalizeReqData(rest, { creatorId });

      try {
        const { task } = app.objection.models;
        // await task.transaction(async (trx) => {
        //   const thisTask = await task.query(trx).insert(normalizedReqData);
        //   for (const label of [...labels]) {
        //     await thisTask
        //       .$relatedQuery('labels', trx)
        //       .relate(Number(label));
        //   }
        // });
        await task.transaction(async (trx) => {
          const thisTask = await task.query(trx).insert(normalizedReqData);
          const promises = [...reqLabels].map((label) => thisTask
            .$relatedQuery('labels', trx)
            .relate(Number(label)));
          await Promise.all(promises);
        });

        req.flash('info', i18next.t('flash.tasks.create.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch (e) {
        console.log('errors--->', e);
        if (_.get(e.data, 'statusId[0].message') === 'must be number') {
          e.data.statusId[0].message = 'please provide a status';
        }

        const statuses = await app.objection.models.status.query();
        const executors = await app.objection.models.user.query();
        const labels = await app.objection.models.label.query();

        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task: req.body.data, statuses, executors, labels, errors: e.data,
        });
        return reply;
      }
    })
    .get('/tasks/:id/edit', { name: 'updateTaskForm', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id).withGraphJoined('[status, creator, executor, labels]');
      // console.log('task.labels--->', task.labels);
      const statuses = await app.objection.models.status.query();
      const executors = await app.objection.models.user.query();
      const labels = await app.objection.models.label.query();
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
      const { labels: reqLabels, ...rest } = req.body.data;
      const normalizedReqData = normalizeReqData(rest, { creatorId });

      try {
        await task.transaction(async (trx) => {
          await thisTask
            .$relatedQuery('labels', trx)
            .unrelate();
          await thisTask.$query(trx).patch(normalizedReqData);
          const promises = [...reqLabels].map((label) => thisTask
            .$relatedQuery('labels', trx)
            .relate(Number(label)));
          await Promise.all(promises);
          // for (const label of [...reqLabels]) {
          //   await thisTask
          //     .$relatedQuery('labels', trx)
          //     .relate(Number(label));
          // }
        });

        req.flash('info', i18next.t('flash.tasks.update.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch (e) {
        console.log('errors--->', e);
        if (_.get(e.data, 'statusId[0].message') === 'must be number') {
          e.data.statusId[0].message = 'please provide a status';
        }

        const statuses = await app.objection.models.status.query();
        const executors = await app.objection.models.user.query();
        const labels = await app.objection.models.label.query();

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
        // await app.objection.models.task.query().deleteById(id);

        req.flash('info', i18next.t('flash.tasks.delete.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch (err) {
        console.log('errors---->', err);
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        return reply.redirect(app.reverse('tasks'));
      }
    });
};
