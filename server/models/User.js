import { Model } from 'objection';
import objectionUnique from 'objection-unique';
import encrypt from '../lib/secure.js';

// import Ajv from 'ajv';
// import addFormats from 'ajv-formats';

const unique = objectionUnique({ fields: ['email'] });

// const ajv = new Ajv()
// addFormats(ajv, ["email"])

export default class User extends unique(Model) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'firstName', 'lastName'],
      properties: {
        id: { type: 'integer' },
        // email: { type: 'string', format: 'email' },
        // email: { type: 'string', minLength: 5, pattern: '^\\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$' },
        email: { type: 'string', minLength: 5, pattern: '\\S+@\\S+\\.\\S+' },
        // email: { type: 'string', minLength: 5},
        password: { type: 'string', minLength: 3 },
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 },
      },
    };
  }

  set password(value) {
    this.passwordDigest = encrypt(value);
  }

  verifyPassword(password) {
    return encrypt(password) === this.passwordDigest;
  }

  // getModelName() {
  //   return 'user';
  // }
}
