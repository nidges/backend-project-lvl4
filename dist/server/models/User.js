"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objection = require("objection");

var _objectionUnique = _interopRequireDefault(require("objection-unique"));

var _secure = _interopRequireDefault(require("../lib/secure.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Ajv from 'ajv';
// import addFormats from 'ajv-formats';
const unique = (0, _objectionUnique.default)({
  fields: ['email']
}); // const ajv = new Ajv()
// addFormats(ajv, ["email"])

class User extends unique(_objection.Model) {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'firstName', 'lastName'],
      properties: {
        id: {
          type: 'integer'
        },
        // email: { type: 'string', format: 'email' },
        // email: { type: 'string', minLength: 5, pattern: '^\\w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$' },
        email: {
          type: 'string',
          minLength: 5,
          pattern: '\\S+@\\S+\\.\\S+'
        },
        // email: { type: 'string', minLength: 5},
        password: {
          type: 'string',
          minLength: 3
        },
        firstName: {
          type: 'string',
          minLength: 1
        },
        lastName: {
          type: 'string',
          minLength: 1
        }
      }
    };
  }

  set password(value) {
    this.passwordDigest = (0, _secure.default)(value);
  }

  verifyPassword(password) {
    return (0, _secure.default)(password) === this.passwordDigest;
  }

}

exports.default = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9tb2RlbHMvVXNlci5qcyJdLCJuYW1lcyI6WyJ1bmlxdWUiLCJmaWVsZHMiLCJVc2VyIiwiTW9kZWwiLCJ0YWJsZU5hbWUiLCJqc29uU2NoZW1hIiwidHlwZSIsInJlcXVpcmVkIiwicHJvcGVydGllcyIsImlkIiwiZW1haWwiLCJtaW5MZW5ndGgiLCJwYXR0ZXJuIiwicGFzc3dvcmQiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInZhbHVlIiwicGFzc3dvcmREaWdlc3QiLCJ2ZXJpZnlQYXNzd29yZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRUE7QUFDQTtBQUVBLE1BQU1BLE1BQU0sR0FBRyw4QkFBZ0I7QUFBRUMsRUFBQUEsTUFBTSxFQUFFLENBQUMsT0FBRDtBQUFWLENBQWhCLENBQWYsQyxDQUVBO0FBQ0E7O0FBRWUsTUFBTUMsSUFBTixTQUFtQkYsTUFBTSxDQUFDRyxnQkFBRCxDQUF6QixDQUFpQztBQUMxQixhQUFUQyxTQUFTLEdBQUc7QUFDckIsV0FBTyxPQUFQO0FBQ0Q7O0FBRW9CLGFBQVZDLFVBQVUsR0FBRztBQUN0QixXQUFPO0FBQ0xDLE1BQUFBLElBQUksRUFBRSxRQUREO0FBRUxDLE1BQUFBLFFBQVEsRUFBRSxDQUFDLE9BQUQsRUFBVSxVQUFWLEVBQXNCLFdBQXRCLEVBQW1DLFVBQW5DLENBRkw7QUFHTEMsTUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLFFBQUFBLEVBQUUsRUFBRTtBQUFFSCxVQUFBQSxJQUFJLEVBQUU7QUFBUixTQURNO0FBRVY7QUFDQTtBQUNBSSxRQUFBQSxLQUFLLEVBQUU7QUFBRUosVUFBQUEsSUFBSSxFQUFFLFFBQVI7QUFBa0JLLFVBQUFBLFNBQVMsRUFBRSxDQUE3QjtBQUFnQ0MsVUFBQUEsT0FBTyxFQUFFO0FBQXpDLFNBSkc7QUFLVjtBQUNBQyxRQUFBQSxRQUFRLEVBQUU7QUFBRVAsVUFBQUEsSUFBSSxFQUFFLFFBQVI7QUFBa0JLLFVBQUFBLFNBQVMsRUFBRTtBQUE3QixTQU5BO0FBT1ZHLFFBQUFBLFNBQVMsRUFBRTtBQUFFUixVQUFBQSxJQUFJLEVBQUUsUUFBUjtBQUFrQkssVUFBQUEsU0FBUyxFQUFFO0FBQTdCLFNBUEQ7QUFRVkksUUFBQUEsUUFBUSxFQUFFO0FBQUVULFVBQUFBLElBQUksRUFBRSxRQUFSO0FBQWtCSyxVQUFBQSxTQUFTLEVBQUU7QUFBN0I7QUFSQTtBQUhQLEtBQVA7QUFjRDs7QUFFVyxNQUFSRSxRQUFRLENBQUNHLEtBQUQsRUFBUTtBQUNsQixTQUFLQyxjQUFMLEdBQXNCLHFCQUFRRCxLQUFSLENBQXRCO0FBQ0Q7O0FBRURFLEVBQUFBLGNBQWMsQ0FBQ0wsUUFBRCxFQUFXO0FBQ3ZCLFdBQU8scUJBQVFBLFFBQVIsTUFBc0IsS0FBS0ksY0FBbEM7QUFDRDs7QUE1QjZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICdvYmplY3Rpb24nO1xuaW1wb3J0IG9iamVjdGlvblVuaXF1ZSBmcm9tICdvYmplY3Rpb24tdW5pcXVlJztcbmltcG9ydCBlbmNyeXB0IGZyb20gJy4uL2xpYi9zZWN1cmUuanMnO1xuXG4vLyBpbXBvcnQgQWp2IGZyb20gJ2Fqdic7XG4vLyBpbXBvcnQgYWRkRm9ybWF0cyBmcm9tICdhanYtZm9ybWF0cyc7XG5cbmNvbnN0IHVuaXF1ZSA9IG9iamVjdGlvblVuaXF1ZSh7IGZpZWxkczogWydlbWFpbCddIH0pO1xuXG4vLyBjb25zdCBhanYgPSBuZXcgQWp2KClcbi8vIGFkZEZvcm1hdHMoYWp2LCBbXCJlbWFpbFwiXSlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIHVuaXF1ZShNb2RlbCkge1xuICBzdGF0aWMgZ2V0IHRhYmxlTmFtZSgpIHtcbiAgICByZXR1cm4gJ3VzZXJzJztcbiAgfVxuXG4gIHN0YXRpYyBnZXQganNvblNjaGVtYSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICByZXF1aXJlZDogWydlbWFpbCcsICdwYXNzd29yZCcsICdmaXJzdE5hbWUnLCAnbGFzdE5hbWUnXSxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWQ6IHsgdHlwZTogJ2ludGVnZXInIH0sXG4gICAgICAgIC8vIGVtYWlsOiB7IHR5cGU6ICdzdHJpbmcnLCBmb3JtYXQ6ICdlbWFpbCcgfSxcbiAgICAgICAgLy8gZW1haWw6IHsgdHlwZTogJ3N0cmluZycsIG1pbkxlbmd0aDogNSwgcGF0dGVybjogJ15cXFxcdytAW2EtekEtWl9dKz8uW2EtekEtWl17MiwzfSQnIH0sXG4gICAgICAgIGVtYWlsOiB7IHR5cGU6ICdzdHJpbmcnLCBtaW5MZW5ndGg6IDUsIHBhdHRlcm46ICdcXFxcUytAXFxcXFMrXFxcXC5cXFxcUysnIH0sXG4gICAgICAgIC8vIGVtYWlsOiB7IHR5cGU6ICdzdHJpbmcnLCBtaW5MZW5ndGg6IDV9LFxuICAgICAgICBwYXNzd29yZDogeyB0eXBlOiAnc3RyaW5nJywgbWluTGVuZ3RoOiAzIH0sXG4gICAgICAgIGZpcnN0TmFtZTogeyB0eXBlOiAnc3RyaW5nJywgbWluTGVuZ3RoOiAxIH0sXG4gICAgICAgIGxhc3ROYW1lOiB7IHR5cGU6ICdzdHJpbmcnLCBtaW5MZW5ndGg6IDEgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHNldCBwYXNzd29yZCh2YWx1ZSkge1xuICAgIHRoaXMucGFzc3dvcmREaWdlc3QgPSBlbmNyeXB0KHZhbHVlKTtcbiAgfVxuXG4gIHZlcmlmeVBhc3N3b3JkKHBhc3N3b3JkKSB7XG4gICAgcmV0dXJuIGVuY3J5cHQocGFzc3dvcmQpID09PSB0aGlzLnBhc3N3b3JkRGlnZXN0O1xuICB9XG59XG4iXX0=