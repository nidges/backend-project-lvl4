"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _welcome = _interopRequireDefault(require("./welcome.js"));

var _users = _interopRequireDefault(require("./users.js"));

var _session = _interopRequireDefault(require("./session.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controllers = [_welcome.default, _users.default, _session.default];

var _default = app => controllers.forEach(f => f(app));

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9yb3V0ZXMvaW5kZXguanMiXSwibmFtZXMiOlsiY29udHJvbGxlcnMiLCJ3ZWxjb21lIiwidXNlcnMiLCJzZXNzaW9uIiwiYXBwIiwiZm9yRWFjaCIsImYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLFdBQVcsR0FBRyxDQUNsQkMsZ0JBRGtCLEVBRWxCQyxjQUZrQixFQUdsQkMsZ0JBSGtCLENBQXBCOztlQU1nQkMsR0FBRCxJQUFTSixXQUFXLENBQUNLLE9BQVosQ0FBcUJDLENBQUQsSUFBT0EsQ0FBQyxDQUFDRixHQUFELENBQTVCLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VsY29tZSBmcm9tICcuL3dlbGNvbWUuanMnO1xuaW1wb3J0IHVzZXJzIGZyb20gJy4vdXNlcnMuanMnO1xuaW1wb3J0IHNlc3Npb24gZnJvbSAnLi9zZXNzaW9uLmpzJztcblxuY29uc3QgY29udHJvbGxlcnMgPSBbXG4gIHdlbGNvbWUsXG4gIHVzZXJzLFxuICBzZXNzaW9uLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgKGFwcCkgPT4gY29udHJvbGxlcnMuZm9yRWFjaCgoZikgPT4gZihhcHApKTtcbiJdfQ==