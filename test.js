// const { Model } = require('objection');
// const objectionUnique = require('objection-unique');
//
// const unique = objectionUnique({ fields: ['email'] });
//
// class User extends unique(Model) {
//   static get tableName() {
//     return 'users';
//   }
//
//   static get jsonSchema() {
//     return {
//       type: 'object',
//       required: ['email', 'password', 'firstName', 'lastName'],
//       properties: {
//         id: { type: 'integer' },
//         email: { type: 'string', format: 'email' },
//         password: { type: 'string', minLength: 3 },
//         firstName: { type: 'string', minLength: 1 },
//         lastName: { type: 'string', minLength: 1 },
//       },
//     };
//   }
// }
//
// const data = {
//   email: '', password: '', firstName: '', lastName: '',
// };
// console.log('data--->', data);
//
// const user = User.fromJson(data);
// console.log('----> user', user);

// const fs = require('fs');
// const path = require('path');
// const keyBuffer = fs.readFileSync(path.join(__dirname, 'secret-key'));
// const hexString = keyBuffer.toString('hex');
// console.log(hexString)
const crypto = require('crypto');

console.log(crypto.randomBytes(16).toString('hex'));
