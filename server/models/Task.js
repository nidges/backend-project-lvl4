import { Model } from 'objection';
import path from 'path';
// import MyCustomValidationError from "../../MyCustomValidationError.js";

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

  $parseJson(json, opt) {
    // Remember to call the super class's implementation.
    json = super.$parseJson(json, opt);
    // Do your conversion here.
    return {
      ...json,
      executorId: Number(json.executorId) || null,
      statusId: Number(json.statusId) || null,
    };
  }

  // static createValidationError({ type, message, data }) {
  //   return new MyCustomValidationError({ type, message, modelClass: this, data });
  // }

  // $beforeInsert() {
  //   if (this.id) {
  //     throw new objection.ValidationError({
  //       message: 'identifier should not be defined before insert',
  //       type: 'MyCustomError',
  //       data: someObjectWithSomeData
  //     });
  //   }
  // }

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
    },
  };
}
