"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = value => _crypto.default.createHash('sha256').update(value).digest('hex');

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9saWIvc2VjdXJlLmpzIl0sIm5hbWVzIjpbInZhbHVlIiwiY3J5cHRvIiwiY3JlYXRlSGFzaCIsInVwZGF0ZSIsImRpZ2VzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O2VBRWdCQSxLQUFELElBQVdDLGdCQUFPQyxVQUFQLENBQWtCLFFBQWxCLEVBQ3ZCQyxNQUR1QixDQUNoQkgsS0FEZ0IsRUFFdkJJLE1BRnVCLENBRWhCLEtBRmdCLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5cbmV4cG9ydCBkZWZhdWx0ICh2YWx1ZSkgPT4gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTI1NicpXG4gIC51cGRhdGUodmFsdWUpXG4gIC5kaWdlc3QoJ2hleCcpO1xuIl19