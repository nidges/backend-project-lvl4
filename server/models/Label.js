import { Model } from 'objection';
import path from 'path';
import objectionUnique from "objection-unique";
const unique = objectionUnique({ fields: ['name'] });


export default class Label extends unique(Model) {
    static get tableName() {
        return 'labels';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1 },
            },
        };
    }

    static get relationMappings() {
        return {
            tasks: {
                relation: Model.ManyToManyRelation,
                modelClass: path.join(__dirname, 'Task'),
                join: {
                    from: 'labels.id',
                    through: {
                        from: 'labels_tasks.label_id',
                        to: 'labels_tasks.task_id'
                    },
                    to: 'tasks.id',
                },
            },
        };
    }
}
