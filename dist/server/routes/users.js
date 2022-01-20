"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = app => {
  app.get('/users', {
    name: 'users'
  }, async (req, reply) => {
    const users = await app.objection.models.user.query();
    reply.render('users/index', {
      users
    });
    return reply;
  }).get('/users/new', {
    name: 'newUser'
  }, (req, reply) => {
    const user = new app.objection.models.user();
    reply.render('users/new', {
      user
    });
  }).post('/users', async (req, reply) => {
    try {
      const user = await app.objection.models.user.fromJson(req.body.data);
      await app.objection.models.user.query().insert(user);
      req.flash('info', _i18next.default.t('flash.users.create.success'));
      return reply.redirect(app.reverse('root'));
    } catch ({
      data
    }) {
      console.log('errors--->', data);

      if (_lodash.default.get(data, 'email[0].keyword') === 'pattern') {
        data.email[0].message = 'please provide a valid email';
      }

      req.flash('error', _i18next.default.t('flash.users.create.error'));
      reply.render('users/new', {
        user: req.body.data,
        errors: data
      });
      return reply;
    }
  }).get('/users/:id/edit', {
    name: 'updateUserForm',
    preValidation: app.authenticate
  }, async (req, reply) => {
    // если с валидацией все норм в req.user будет юзер который залогинен
    if (!req.user) {
      req.flash('error', _i18next.default.t('flash.authError'));
      return reply.redirect(app.reverse('root'));
    }

    if (Number(req.params.id) !== Number(req.user.id)) {
      req.flash('error', _i18next.default.t('flash.users.update.error'));
      return reply.redirect(app.reverse('users'));
    }

    const user = await app.objection.models.user.query().findById(req.user.id);
    reply.render('users/update', {
      user
    });
    return reply;
  }).patch('/users/:id', {
    name: 'updateUser',
    preValidation: app.authenticate
  }, async (req, reply) => {
    // console.log('req.user-------->', req.user);
    // console.log('req.body.data---->', req.body.data);
    const {
      id
    } = req.user;

    try {
      const user = await app.objection.models.user.query().findById(id); // const updatedUser = await user.$query().patchAndFetchById(id, req.body.data);

      await user.$query().patch(req.body.data);
      req.flash('info', _i18next.default.t('flash.users.update.success'));
      return reply.redirect(app.reverse('users'));
    } catch ({
      data
    }) {
      console.log('errors--->', data);

      if (_lodash.default.get(data, 'email[0].keyword') === 'pattern') {
        data.email[0].message = 'please provide a valid email';
      }

      reply.render('users/update', {
        user: {
          id,
          ...req.body.data
        },
        errors: data
      });
      return reply;
    }
  }).delete('/users/:id', {
    preValidation: app.authenticate
  }, async (req, reply) => {
    // console.log('req.user-------->', req.user);
    const {
      id
    } = req.user;

    try {
      await app.objection.models.user.query().deleteById(id);
      await req.logOut();
      req.flash('info', _i18next.default.t('flash.users.delete.success'));
      return reply.redirect(app.reverse('users'));
    } catch (err) {
      console.log('errors---->', err);
      req.flash('error', _i18next.default.t('flash.users.delete.fail'));
      return reply.redirect(app.reverse('users'));
    }
  });
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9yb3V0ZXMvdXNlcnMuanMiXSwibmFtZXMiOlsiYXBwIiwiZ2V0IiwibmFtZSIsInJlcSIsInJlcGx5IiwidXNlcnMiLCJvYmplY3Rpb24iLCJtb2RlbHMiLCJ1c2VyIiwicXVlcnkiLCJyZW5kZXIiLCJwb3N0IiwiZnJvbUpzb24iLCJib2R5IiwiZGF0YSIsImluc2VydCIsImZsYXNoIiwiaTE4bmV4dCIsInQiLCJyZWRpcmVjdCIsInJldmVyc2UiLCJjb25zb2xlIiwibG9nIiwiXyIsImVtYWlsIiwibWVzc2FnZSIsImVycm9ycyIsInByZVZhbGlkYXRpb24iLCJhdXRoZW50aWNhdGUiLCJOdW1iZXIiLCJwYXJhbXMiLCJpZCIsImZpbmRCeUlkIiwicGF0Y2giLCIkcXVlcnkiLCJkZWxldGUiLCJkZWxldGVCeUlkIiwibG9nT3V0IiwiZXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7ZUFFZ0JBLEdBQUQsSUFBUztBQUN0QkEsRUFBQUEsR0FBRyxDQUNBQyxHQURILENBQ08sUUFEUCxFQUNpQjtBQUFFQyxJQUFBQSxJQUFJLEVBQUU7QUFBUixHQURqQixFQUNvQyxPQUFPQyxHQUFQLEVBQVlDLEtBQVosS0FBc0I7QUFDdEQsVUFBTUMsS0FBSyxHQUFHLE1BQU1MLEdBQUcsQ0FBQ00sU0FBSixDQUFjQyxNQUFkLENBQXFCQyxJQUFyQixDQUEwQkMsS0FBMUIsRUFBcEI7QUFDQUwsSUFBQUEsS0FBSyxDQUFDTSxNQUFOLENBQWEsYUFBYixFQUE0QjtBQUFFTCxNQUFBQTtBQUFGLEtBQTVCO0FBQ0EsV0FBT0QsS0FBUDtBQUNELEdBTEgsRUFNR0gsR0FOSCxDQU1PLFlBTlAsRUFNcUI7QUFBRUMsSUFBQUEsSUFBSSxFQUFFO0FBQVIsR0FOckIsRUFNMEMsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLEtBQWdCO0FBQ3RELFVBQU1JLElBQUksR0FBRyxJQUFJUixHQUFHLENBQUNNLFNBQUosQ0FBY0MsTUFBZCxDQUFxQkMsSUFBekIsRUFBYjtBQUNBSixJQUFBQSxLQUFLLENBQUNNLE1BQU4sQ0FBYSxXQUFiLEVBQTBCO0FBQUVGLE1BQUFBO0FBQUYsS0FBMUI7QUFDRCxHQVRILEVBVUdHLElBVkgsQ0FVUSxRQVZSLEVBVWtCLE9BQU9SLEdBQVAsRUFBWUMsS0FBWixLQUFzQjtBQUNwQyxRQUFJO0FBQ0YsWUFBTUksSUFBSSxHQUFHLE1BQU1SLEdBQUcsQ0FBQ00sU0FBSixDQUFjQyxNQUFkLENBQXFCQyxJQUFyQixDQUEwQkksUUFBMUIsQ0FBbUNULEdBQUcsQ0FBQ1UsSUFBSixDQUFTQyxJQUE1QyxDQUFuQjtBQUNBLFlBQU1kLEdBQUcsQ0FBQ00sU0FBSixDQUFjQyxNQUFkLENBQXFCQyxJQUFyQixDQUEwQkMsS0FBMUIsR0FBa0NNLE1BQWxDLENBQXlDUCxJQUF6QyxDQUFOO0FBQ0FMLE1BQUFBLEdBQUcsQ0FBQ2EsS0FBSixDQUFVLE1BQVYsRUFBa0JDLGlCQUFRQyxDQUFSLENBQVUsNEJBQVYsQ0FBbEI7QUFDQSxhQUFPZCxLQUFLLENBQUNlLFFBQU4sQ0FBZW5CLEdBQUcsQ0FBQ29CLE9BQUosQ0FBWSxNQUFaLENBQWYsQ0FBUDtBQUNELEtBTEQsQ0FLRSxPQUFPO0FBQUVOLE1BQUFBO0FBQUYsS0FBUCxFQUFpQjtBQUNqQk8sTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWixFQUEwQlIsSUFBMUI7O0FBQ0EsVUFBSVMsZ0JBQUV0QixHQUFGLENBQU1hLElBQU4sRUFBWSxrQkFBWixNQUFvQyxTQUF4QyxFQUFtRDtBQUNqREEsUUFBQUEsSUFBSSxDQUFDVSxLQUFMLENBQVcsQ0FBWCxFQUFjQyxPQUFkLEdBQXdCLDhCQUF4QjtBQUNEOztBQUNEdEIsTUFBQUEsR0FBRyxDQUFDYSxLQUFKLENBQVUsT0FBVixFQUFtQkMsaUJBQVFDLENBQVIsQ0FBVSwwQkFBVixDQUFuQjtBQUNBZCxNQUFBQSxLQUFLLENBQUNNLE1BQU4sQ0FBYSxXQUFiLEVBQTBCO0FBQUVGLFFBQUFBLElBQUksRUFBRUwsR0FBRyxDQUFDVSxJQUFKLENBQVNDLElBQWpCO0FBQXVCWSxRQUFBQSxNQUFNLEVBQUVaO0FBQS9CLE9BQTFCO0FBQ0EsYUFBT1YsS0FBUDtBQUNEO0FBQ0YsR0F6QkgsRUEwQkdILEdBMUJILENBMEJPLGlCQTFCUCxFQTBCMEI7QUFBRUMsSUFBQUEsSUFBSSxFQUFFLGdCQUFSO0FBQTBCeUIsSUFBQUEsYUFBYSxFQUFFM0IsR0FBRyxDQUFDNEI7QUFBN0MsR0ExQjFCLEVBMEJ1RixPQUFPekIsR0FBUCxFQUFZQyxLQUFaLEtBQXNCO0FBQ3pHO0FBQ0EsUUFBSSxDQUFDRCxHQUFHLENBQUNLLElBQVQsRUFBZTtBQUNiTCxNQUFBQSxHQUFHLENBQUNhLEtBQUosQ0FBVSxPQUFWLEVBQW1CQyxpQkFBUUMsQ0FBUixDQUFVLGlCQUFWLENBQW5CO0FBQ0EsYUFBT2QsS0FBSyxDQUFDZSxRQUFOLENBQWVuQixHQUFHLENBQUNvQixPQUFKLENBQVksTUFBWixDQUFmLENBQVA7QUFDRDs7QUFFRCxRQUFJUyxNQUFNLENBQUMxQixHQUFHLENBQUMyQixNQUFKLENBQVdDLEVBQVosQ0FBTixLQUEwQkYsTUFBTSxDQUFDMUIsR0FBRyxDQUFDSyxJQUFKLENBQVN1QixFQUFWLENBQXBDLEVBQW1EO0FBQ2pENUIsTUFBQUEsR0FBRyxDQUFDYSxLQUFKLENBQVUsT0FBVixFQUFtQkMsaUJBQVFDLENBQVIsQ0FBVSwwQkFBVixDQUFuQjtBQUNBLGFBQU9kLEtBQUssQ0FBQ2UsUUFBTixDQUFlbkIsR0FBRyxDQUFDb0IsT0FBSixDQUFZLE9BQVosQ0FBZixDQUFQO0FBQ0Q7O0FBRUQsVUFBTVosSUFBSSxHQUFHLE1BQU1SLEdBQUcsQ0FBQ00sU0FBSixDQUFjQyxNQUFkLENBQXFCQyxJQUFyQixDQUEwQkMsS0FBMUIsR0FBa0N1QixRQUFsQyxDQUEyQzdCLEdBQUcsQ0FBQ0ssSUFBSixDQUFTdUIsRUFBcEQsQ0FBbkI7QUFDQTNCLElBQUFBLEtBQUssQ0FBQ00sTUFBTixDQUFhLGNBQWIsRUFBNkI7QUFBRUYsTUFBQUE7QUFBRixLQUE3QjtBQUNBLFdBQU9KLEtBQVA7QUFDRCxHQXpDSCxFQTBDRzZCLEtBMUNILENBMENTLFlBMUNULEVBMEN1QjtBQUFFL0IsSUFBQUEsSUFBSSxFQUFFLFlBQVI7QUFBc0J5QixJQUFBQSxhQUFhLEVBQUUzQixHQUFHLENBQUM0QjtBQUF6QyxHQTFDdkIsRUEwQ2dGLE9BQU96QixHQUFQLEVBQVlDLEtBQVosS0FBc0I7QUFDbEc7QUFDQTtBQUNBLFVBQU07QUFBRTJCLE1BQUFBO0FBQUYsUUFBUzVCLEdBQUcsQ0FBQ0ssSUFBbkI7O0FBRUEsUUFBSTtBQUNGLFlBQU1BLElBQUksR0FBRyxNQUFNUixHQUFHLENBQUNNLFNBQUosQ0FBY0MsTUFBZCxDQUFxQkMsSUFBckIsQ0FBMEJDLEtBQTFCLEdBQWtDdUIsUUFBbEMsQ0FBMkNELEVBQTNDLENBQW5CLENBREUsQ0FFRjs7QUFDQSxZQUFNdkIsSUFBSSxDQUFDMEIsTUFBTCxHQUFjRCxLQUFkLENBQW9COUIsR0FBRyxDQUFDVSxJQUFKLENBQVNDLElBQTdCLENBQU47QUFDQVgsTUFBQUEsR0FBRyxDQUFDYSxLQUFKLENBQVUsTUFBVixFQUFrQkMsaUJBQVFDLENBQVIsQ0FBVSw0QkFBVixDQUFsQjtBQUNBLGFBQU9kLEtBQUssQ0FBQ2UsUUFBTixDQUFlbkIsR0FBRyxDQUFDb0IsT0FBSixDQUFZLE9BQVosQ0FBZixDQUFQO0FBQ0QsS0FORCxDQU1FLE9BQU87QUFBRU4sTUFBQUE7QUFBRixLQUFQLEVBQWlCO0FBQ2pCTyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaLEVBQTBCUixJQUExQjs7QUFDQSxVQUFJUyxnQkFBRXRCLEdBQUYsQ0FBTWEsSUFBTixFQUFZLGtCQUFaLE1BQW9DLFNBQXhDLEVBQW1EO0FBQ2pEQSxRQUFBQSxJQUFJLENBQUNVLEtBQUwsQ0FBVyxDQUFYLEVBQWNDLE9BQWQsR0FBd0IsOEJBQXhCO0FBQ0Q7O0FBQ0RyQixNQUFBQSxLQUFLLENBQUNNLE1BQU4sQ0FBYSxjQUFiLEVBQTZCO0FBQUVGLFFBQUFBLElBQUksRUFBRTtBQUFFdUIsVUFBQUEsRUFBRjtBQUFNLGFBQUc1QixHQUFHLENBQUNVLElBQUosQ0FBU0M7QUFBbEIsU0FBUjtBQUFrQ1ksUUFBQUEsTUFBTSxFQUFFWjtBQUExQyxPQUE3QjtBQUNBLGFBQU9WLEtBQVA7QUFDRDtBQUNGLEdBN0RILEVBOERHK0IsTUE5REgsQ0E4RFUsWUE5RFYsRUE4RHdCO0FBQUVSLElBQUFBLGFBQWEsRUFBRTNCLEdBQUcsQ0FBQzRCO0FBQXJCLEdBOUR4QixFQThENkQsT0FBT3pCLEdBQVAsRUFBWUMsS0FBWixLQUFzQjtBQUMvRTtBQUNBLFVBQU07QUFBRTJCLE1BQUFBO0FBQUYsUUFBUzVCLEdBQUcsQ0FBQ0ssSUFBbkI7O0FBRUEsUUFBSTtBQUNGLFlBQU1SLEdBQUcsQ0FBQ00sU0FBSixDQUFjQyxNQUFkLENBQXFCQyxJQUFyQixDQUEwQkMsS0FBMUIsR0FBa0MyQixVQUFsQyxDQUE2Q0wsRUFBN0MsQ0FBTjtBQUNBLFlBQU01QixHQUFHLENBQUNrQyxNQUFKLEVBQU47QUFFQWxDLE1BQUFBLEdBQUcsQ0FBQ2EsS0FBSixDQUFVLE1BQVYsRUFBa0JDLGlCQUFRQyxDQUFSLENBQVUsNEJBQVYsQ0FBbEI7QUFDQSxhQUFPZCxLQUFLLENBQUNlLFFBQU4sQ0FBZW5CLEdBQUcsQ0FBQ29CLE9BQUosQ0FBWSxPQUFaLENBQWYsQ0FBUDtBQUNELEtBTkQsQ0FNRSxPQUFPa0IsR0FBUCxFQUFZO0FBQ1pqQixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCZ0IsR0FBM0I7QUFDQW5DLE1BQUFBLEdBQUcsQ0FBQ2EsS0FBSixDQUFVLE9BQVYsRUFBbUJDLGlCQUFRQyxDQUFSLENBQVUseUJBQVYsQ0FBbkI7QUFDQSxhQUFPZCxLQUFLLENBQUNlLFFBQU4sQ0FBZW5CLEdBQUcsQ0FBQ29CLE9BQUosQ0FBWSxPQUFaLENBQWYsQ0FBUDtBQUNEO0FBQ0YsR0E3RUg7QUE4RUQsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgKGFwcCkgPT4ge1xuICBhcHBcbiAgICAuZ2V0KCcvdXNlcnMnLCB7IG5hbWU6ICd1c2VycycgfSwgYXN5bmMgKHJlcSwgcmVwbHkpID0+IHtcbiAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgYXBwLm9iamVjdGlvbi5tb2RlbHMudXNlci5xdWVyeSgpO1xuICAgICAgcmVwbHkucmVuZGVyKCd1c2Vycy9pbmRleCcsIHsgdXNlcnMgfSk7XG4gICAgICByZXR1cm4gcmVwbHk7XG4gICAgfSlcbiAgICAuZ2V0KCcvdXNlcnMvbmV3JywgeyBuYW1lOiAnbmV3VXNlcicgfSwgKHJlcSwgcmVwbHkpID0+IHtcbiAgICAgIGNvbnN0IHVzZXIgPSBuZXcgYXBwLm9iamVjdGlvbi5tb2RlbHMudXNlcigpO1xuICAgICAgcmVwbHkucmVuZGVyKCd1c2Vycy9uZXcnLCB7IHVzZXIgfSk7XG4gICAgfSlcbiAgICAucG9zdCgnL3VzZXJzJywgYXN5bmMgKHJlcSwgcmVwbHkpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBhcHAub2JqZWN0aW9uLm1vZGVscy51c2VyLmZyb21Kc29uKHJlcS5ib2R5LmRhdGEpO1xuICAgICAgICBhd2FpdCBhcHAub2JqZWN0aW9uLm1vZGVscy51c2VyLnF1ZXJ5KCkuaW5zZXJ0KHVzZXIpO1xuICAgICAgICByZXEuZmxhc2goJ2luZm8nLCBpMThuZXh0LnQoJ2ZsYXNoLnVzZXJzLmNyZWF0ZS5zdWNjZXNzJykpO1xuICAgICAgICByZXR1cm4gcmVwbHkucmVkaXJlY3QoYXBwLnJldmVyc2UoJ3Jvb3QnKSk7XG4gICAgICB9IGNhdGNoICh7IGRhdGEgfSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3JzLS0tPicsIGRhdGEpO1xuICAgICAgICBpZiAoXy5nZXQoZGF0YSwgJ2VtYWlsWzBdLmtleXdvcmQnKSA9PT0gJ3BhdHRlcm4nKSB7XG4gICAgICAgICAgZGF0YS5lbWFpbFswXS5tZXNzYWdlID0gJ3BsZWFzZSBwcm92aWRlIGEgdmFsaWQgZW1haWwnO1xuICAgICAgICB9XG4gICAgICAgIHJlcS5mbGFzaCgnZXJyb3InLCBpMThuZXh0LnQoJ2ZsYXNoLnVzZXJzLmNyZWF0ZS5lcnJvcicpKTtcbiAgICAgICAgcmVwbHkucmVuZGVyKCd1c2Vycy9uZXcnLCB7IHVzZXI6IHJlcS5ib2R5LmRhdGEsIGVycm9yczogZGF0YSB9KTtcbiAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgfVxuICAgIH0pXG4gICAgLmdldCgnL3VzZXJzLzppZC9lZGl0JywgeyBuYW1lOiAndXBkYXRlVXNlckZvcm0nLCBwcmVWYWxpZGF0aW9uOiBhcHAuYXV0aGVudGljYXRlIH0sIGFzeW5jIChyZXEsIHJlcGx5KSA9PiB7XG4gICAgICAvLyDQtdGB0LvQuCDRgSDQstCw0LvQuNC00LDRhtC40LXQuSDQstGB0LUg0L3QvtGA0Lwg0LIgcmVxLnVzZXIg0LHRg9C00LXRgiDRjtC30LXRgCDQutC+0YLQvtGA0YvQuSDQt9Cw0LvQvtCz0LjQvdC10L1cbiAgICAgIGlmICghcmVxLnVzZXIpIHtcbiAgICAgICAgcmVxLmZsYXNoKCdlcnJvcicsIGkxOG5leHQudCgnZmxhc2guYXV0aEVycm9yJykpO1xuICAgICAgICByZXR1cm4gcmVwbHkucmVkaXJlY3QoYXBwLnJldmVyc2UoJ3Jvb3QnKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChOdW1iZXIocmVxLnBhcmFtcy5pZCkgIT09IE51bWJlcihyZXEudXNlci5pZCkpIHtcbiAgICAgICAgcmVxLmZsYXNoKCdlcnJvcicsIGkxOG5leHQudCgnZmxhc2gudXNlcnMudXBkYXRlLmVycm9yJykpO1xuICAgICAgICByZXR1cm4gcmVwbHkucmVkaXJlY3QoYXBwLnJldmVyc2UoJ3VzZXJzJykpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgYXBwLm9iamVjdGlvbi5tb2RlbHMudXNlci5xdWVyeSgpLmZpbmRCeUlkKHJlcS51c2VyLmlkKTtcbiAgICAgIHJlcGx5LnJlbmRlcigndXNlcnMvdXBkYXRlJywgeyB1c2VyIH0pO1xuICAgICAgcmV0dXJuIHJlcGx5O1xuICAgIH0pXG4gICAgLnBhdGNoKCcvdXNlcnMvOmlkJywgeyBuYW1lOiAndXBkYXRlVXNlcicsIHByZVZhbGlkYXRpb246IGFwcC5hdXRoZW50aWNhdGUgfSwgYXN5bmMgKHJlcSwgcmVwbHkpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdyZXEudXNlci0tLS0tLS0tPicsIHJlcS51c2VyKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdyZXEuYm9keS5kYXRhLS0tLT4nLCByZXEuYm9keS5kYXRhKTtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS51c2VyO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgYXBwLm9iamVjdGlvbi5tb2RlbHMudXNlci5xdWVyeSgpLmZpbmRCeUlkKGlkKTtcbiAgICAgICAgLy8gY29uc3QgdXBkYXRlZFVzZXIgPSBhd2FpdCB1c2VyLiRxdWVyeSgpLnBhdGNoQW5kRmV0Y2hCeUlkKGlkLCByZXEuYm9keS5kYXRhKTtcbiAgICAgICAgYXdhaXQgdXNlci4kcXVlcnkoKS5wYXRjaChyZXEuYm9keS5kYXRhKTtcbiAgICAgICAgcmVxLmZsYXNoKCdpbmZvJywgaTE4bmV4dC50KCdmbGFzaC51c2Vycy51cGRhdGUuc3VjY2VzcycpKTtcbiAgICAgICAgcmV0dXJuIHJlcGx5LnJlZGlyZWN0KGFwcC5yZXZlcnNlKCd1c2VycycpKTtcbiAgICAgIH0gY2F0Y2ggKHsgZGF0YSB9KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcnMtLS0+JywgZGF0YSk7XG4gICAgICAgIGlmIChfLmdldChkYXRhLCAnZW1haWxbMF0ua2V5d29yZCcpID09PSAncGF0dGVybicpIHtcbiAgICAgICAgICBkYXRhLmVtYWlsWzBdLm1lc3NhZ2UgPSAncGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBlbWFpbCc7XG4gICAgICAgIH1cbiAgICAgICAgcmVwbHkucmVuZGVyKCd1c2Vycy91cGRhdGUnLCB7IHVzZXI6IHsgaWQsIC4uLnJlcS5ib2R5LmRhdGEgfSwgZXJyb3JzOiBkYXRhIH0pO1xuICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICB9XG4gICAgfSlcbiAgICAuZGVsZXRlKCcvdXNlcnMvOmlkJywgeyBwcmVWYWxpZGF0aW9uOiBhcHAuYXV0aGVudGljYXRlIH0sIGFzeW5jIChyZXEsIHJlcGx5KSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZygncmVxLnVzZXItLS0tLS0tLT4nLCByZXEudXNlcik7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEudXNlcjtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXBwLm9iamVjdGlvbi5tb2RlbHMudXNlci5xdWVyeSgpLmRlbGV0ZUJ5SWQoaWQpO1xuICAgICAgICBhd2FpdCByZXEubG9nT3V0KCk7XG5cbiAgICAgICAgcmVxLmZsYXNoKCdpbmZvJywgaTE4bmV4dC50KCdmbGFzaC51c2Vycy5kZWxldGUuc3VjY2VzcycpKTtcbiAgICAgICAgcmV0dXJuIHJlcGx5LnJlZGlyZWN0KGFwcC5yZXZlcnNlKCd1c2VycycpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3JzLS0tLT4nLCBlcnIpO1xuICAgICAgICByZXEuZmxhc2goJ2Vycm9yJywgaTE4bmV4dC50KCdmbGFzaC51c2Vycy5kZWxldGUuZmFpbCcpKTtcbiAgICAgICAgcmV0dXJuIHJlcGx5LnJlZGlyZWN0KGFwcC5yZXZlcnNlKCd1c2VycycpKTtcbiAgICAgIH1cbiAgICB9KTtcbn07XG4iXX0=