import User from './User.js';
import Status from './Status.js';
import Task from './Task.js';
import Label from './Label.js';

// fastify-objection-js must have a COLLECTION of objection models
export default [
  User,
  Status,
  Task,
  Label,
];
