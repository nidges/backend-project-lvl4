import { Model } from 'objection';
import path from 'path';

export default class Task extends Model {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId', 'creatorId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        statusId: { type: 'number', minimum: 1 },
        creatorId: { type: 'number', minimum: 1 },
        // executorId: { type: 'integer' },
        executorId: { type: ['integer', 'null'], default: null },
      },
    };
  }

  static get relationMappings() {
    return {
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'Status'),
        join: {
          from: 'tasks.statusId',
          to: 'statuses.id',
        },
      },
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'User'),
        join: {
          from: 'tasks.creatorId',
          to: 'users.id',
        },
      },
      executor: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'User'),
        join: {
          from: 'tasks.executorId',
          to: 'users.id',
        },
      },
      labels: {
        relation: Model.ManyToManyRelation,
        modelClass: path.join(__dirname, 'Label'),
        join: {
          from: 'tasks.id',
          through: {
            from: 'labels_tasks.task_id',
            to: 'labels_tasks.label_id',
          },
          to: 'labels.id',
        },
      },
    };
  }

  static modifiers = {
    filterStatus(query, statusId) {
      query.where('statusId', statusId);
    },

    filterExecutor(query, executorId) {
      query.where('executorId', executorId);
    },

    filterLabel(query, labelId) {
      query.where('labelId', labelId);
    },

    filterCreator(query, creatorId) {
      query.where('creatorId', creatorId);
    }
  };
}
