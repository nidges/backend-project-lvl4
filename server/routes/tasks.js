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
      reply.render('tasks/new', { task, statuses, executors });
      return reply;
    })
    .get('/tasks/:id', { name: 'viewTask', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id).withGraphJoined('[status, creator, executor]');
      reply.render('tasks/view', { task });
      return reply;
    })
    .post('/tasks', { preValidation: app.authenticate }, async (req, reply) => {
      const creatorId = req.user.id;
      const normalizedReqData = normalizeReqData(req.body.data, { creatorId });
      try {
        const task = await app.objection.models.task.fromJson(normalizedReqData);
        await app.objection.models.task.query().insertGraph(task, { relate: true });

        req.flash('info', i18next.t('flash.tasks.create.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        console.log('errors--->', data);
        if (_.get(data, 'statusId[0].message') === 'must be number') {
          data.statusId[0].message = 'please provide a status';
        }

        const statuses = await app.objection.models.status.query();
        const executors = await app.objection.models.user.query();

        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', {
          task: req.body.data, statuses, executors, errors: data,
        });
        return reply;
      }
    })
    .get('/tasks/:id/edit', { name: 'updateTaskForm', preValidation: app.authenticate }, async (req, reply) => {
      const task = await app.objection.models.task.query().findById(req.params.id).withGraphJoined('[status, creator, executor]');
      const statuses = await app.objection.models.status.query();
      const executors = await app.objection.models.user.query();
      reply.render('tasks/update', { task, statuses, executors });
      return reply;
    })
    .patch('/tasks/:id', { name: 'updateTask', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      try {
        const task = await app.objection.models.task.query().findById(id);
        const { creatorId } = task;
        const normalizedReqData = normalizeReqData(req.body.data, { creatorId });

        await task.$query().patch(normalizedReqData);
        req.flash('info', i18next.t('flash.tasks.update.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        console.log('errors--->', data);
        if (_.get(data, 'statusId[0].message') === 'must be number') {
          data.statusId[0].message = 'please provide a status';
        }

        const statuses = await app.objection.models.status.query();
        const executors = await app.objection.models.user.query();

        req.flash('error', i18next.t('flash.tasks.update.error'));
        reply.render('tasks/update', {
          task: { id, ...req.body.data }, statuses, executors, errors: data,
        });
        return reply;
      }
    })
    .delete('/tasks/:id', { preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const { creatorId } = await app.objection.models.task.query().findById(id);

      if (req.user.id !== creatorId) {
        req.flash('error', i18next.t('flash.tasks.delete.fail'));
        return reply.redirect(app.reverse('tasks'));
      }

      try {
        await app.objection.models.task.query().deleteById(id);

        req.flash('info', i18next.t('flash.tasks.delete.success'));
        return reply.redirect(app.reverse('tasks'));
      } catch (err) {
        console.log('errors---->', err);
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        return reply.redirect(app.reverse('tasks'));
      }
    });
};
