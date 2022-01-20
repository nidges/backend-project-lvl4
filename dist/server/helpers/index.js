"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = app => ({
  route(name, opts = {}) {
    return app.reverse(name, opts);
  },

  text(key) {
    return _i18next.default.t(key);
  },

  t(key) {
    return _i18next.default.t(key);
  },

  _: _lodash.default,

  getAlertClass(type) {
    switch (type) {
      // case 'failure':
      //   return 'danger';
      case 'error':
        return 'danger';

      case 'success':
        return 'success';

      case 'info':
        return 'info';

      default:
        throw new Error(`Unknown flash type: '${type}'`);
    }
  },

  formatDate(str) {
    const date = new Date(str);
    return date.toLocaleString();
  }

});

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9oZWxwZXJzL2luZGV4LmpzIl0sIm5hbWVzIjpbImFwcCIsInJvdXRlIiwibmFtZSIsIm9wdHMiLCJyZXZlcnNlIiwidGV4dCIsImtleSIsImkxOG5leHQiLCJ0IiwiXyIsImdldEFsZXJ0Q2xhc3MiLCJ0eXBlIiwiRXJyb3IiLCJmb3JtYXREYXRlIiwic3RyIiwiZGF0ZSIsIkRhdGUiLCJ0b0xvY2FsZVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O2VBRWdCQSxHQUFELEtBQVU7QUFDdkJDLEVBQUFBLEtBQUssQ0FBQ0MsSUFBRCxFQUFPQyxJQUFJLEdBQUcsRUFBZCxFQUFrQjtBQUNyQixXQUFPSCxHQUFHLENBQUNJLE9BQUosQ0FBWUYsSUFBWixFQUFrQkMsSUFBbEIsQ0FBUDtBQUNELEdBSHNCOztBQUl2QkUsRUFBQUEsSUFBSSxDQUFDQyxHQUFELEVBQU07QUFDUixXQUFPQyxpQkFBUUMsQ0FBUixDQUFVRixHQUFWLENBQVA7QUFDRCxHQU5zQjs7QUFPdkJFLEVBQUFBLENBQUMsQ0FBQ0YsR0FBRCxFQUFNO0FBQ0wsV0FBT0MsaUJBQVFDLENBQVIsQ0FBVUYsR0FBVixDQUFQO0FBQ0QsR0FUc0I7O0FBVXZCRyxFQUFBQSxDQUFDLEVBQURBLGVBVnVCOztBQVd2QkMsRUFBQUEsYUFBYSxDQUFDQyxJQUFELEVBQU87QUFDbEIsWUFBUUEsSUFBUjtBQUNFO0FBQ0E7QUFDQSxXQUFLLE9BQUw7QUFDRSxlQUFPLFFBQVA7O0FBQ0YsV0FBSyxTQUFMO0FBQ0UsZUFBTyxTQUFQOztBQUNGLFdBQUssTUFBTDtBQUNFLGVBQU8sTUFBUDs7QUFDRjtBQUNFLGNBQU0sSUFBSUMsS0FBSixDQUFXLHdCQUF1QkQsSUFBSyxHQUF2QyxDQUFOO0FBVko7QUFZRCxHQXhCc0I7O0FBeUJ2QkUsRUFBQUEsVUFBVSxDQUFDQyxHQUFELEVBQU07QUFDZCxVQUFNQyxJQUFJLEdBQUcsSUFBSUMsSUFBSixDQUFTRixHQUFULENBQWI7QUFDQSxXQUFPQyxJQUFJLENBQUNFLGNBQUwsRUFBUDtBQUNEOztBQTVCc0IsQ0FBVixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCAoYXBwKSA9PiAoe1xuICByb3V0ZShuYW1lLCBvcHRzID0ge30pIHtcbiAgICByZXR1cm4gYXBwLnJldmVyc2UobmFtZSwgb3B0cyk7XG4gIH0sXG4gIHRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGkxOG5leHQudChrZXkpO1xuICB9LFxuICB0KGtleSkge1xuICAgIHJldHVybiBpMThuZXh0LnQoa2V5KTtcbiAgfSxcbiAgXyxcbiAgZ2V0QWxlcnRDbGFzcyh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAvLyBjYXNlICdmYWlsdXJlJzpcbiAgICAgIC8vICAgcmV0dXJuICdkYW5nZXInO1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICByZXR1cm4gJ2Rhbmdlcic7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgcmV0dXJuICdzdWNjZXNzJztcbiAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICByZXR1cm4gJ2luZm8nO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGZsYXNoIHR5cGU6ICcke3R5cGV9J2ApO1xuICAgIH1cbiAgfSxcbiAgZm9ybWF0RGF0ZShzdHIpIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoc3RyKTtcbiAgICByZXR1cm4gZGF0ZS50b0xvY2FsZVN0cmluZygpO1xuICB9LFxufSk7XG4iXX0=