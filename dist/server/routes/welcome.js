"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = app => {
  // { name: 'root' } требуется для fastify-reverse-routes
  app.get('/', {
    name: 'root'
  }, (req, reply) => {
    reply.render('welcome/index');
  }) // preValidation is a fastify route option
  .get('/protected', {
    name: 'protected',
    preValidation: app.authenticate
  }, (req, reply) => {
    reply.render('welcome/index');
  });
}; // request object:
// console.log('req.body', req.body);
// console.log('req.query', req.query);
// console.log('req.params', req.params);
// console.log('req.headers', req.headers);
// console.log('req.raw', req.raw);
// console.log('req.server', req.server);
// console.log('req.id', req.id);
// console.log('req.ip', req.ip);
// console.log('req.ips', req.ips);
// console.log('req.hostname', req.hostname);
// console.log('req.protocol', req.protocol);
// console.log('req.url', req.url);
// console.log('req.routerMethod', req.routerMethod);
// console.log('req.routerPath', req.routerPath);
// при успешной аутентификации добавляется req.user с залогиненным юзером
// console.log('req.user', req.user);


exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9yb3V0ZXMvd2VsY29tZS5qcyJdLCJuYW1lcyI6WyJhcHAiLCJnZXQiLCJuYW1lIiwicmVxIiwicmVwbHkiLCJyZW5kZXIiLCJwcmVWYWxpZGF0aW9uIiwiYXV0aGVudGljYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O2VBQWdCQSxHQUFELElBQVM7QUFDdEI7QUFDQUEsRUFBQUEsR0FBRyxDQUNBQyxHQURILENBQ08sR0FEUCxFQUNZO0FBQUVDLElBQUFBLElBQUksRUFBRTtBQUFSLEdBRFosRUFDOEIsQ0FBQ0MsR0FBRCxFQUFNQyxLQUFOLEtBQWdCO0FBQzFDQSxJQUFBQSxLQUFLLENBQUNDLE1BQU4sQ0FBYSxlQUFiO0FBQ0QsR0FISCxFQUlBO0FBSkEsR0FLR0osR0FMSCxDQUtPLFlBTFAsRUFLcUI7QUFBRUMsSUFBQUEsSUFBSSxFQUFFLFdBQVI7QUFBcUJJLElBQUFBLGFBQWEsRUFBRU4sR0FBRyxDQUFDTztBQUF4QyxHQUxyQixFQUs2RSxDQUFDSixHQUFELEVBQU1DLEtBQU4sS0FBZ0I7QUFDekZBLElBQUFBLEtBQUssQ0FBQ0MsTUFBTixDQUFhLGVBQWI7QUFDRCxHQVBIO0FBUUQsQyxFQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCAoYXBwKSA9PiB7XG4gIC8vIHsgbmFtZTogJ3Jvb3QnIH0g0YLRgNC10LHRg9C10YLRgdGPINC00LvRjyBmYXN0aWZ5LXJldmVyc2Utcm91dGVzXG4gIGFwcFxuICAgIC5nZXQoJy8nLCB7IG5hbWU6ICdyb290JyB9LCAocmVxLCByZXBseSkgPT4ge1xuICAgICAgcmVwbHkucmVuZGVyKCd3ZWxjb21lL2luZGV4Jyk7XG4gICAgfSlcbiAgLy8gcHJlVmFsaWRhdGlvbiBpcyBhIGZhc3RpZnkgcm91dGUgb3B0aW9uXG4gICAgLmdldCgnL3Byb3RlY3RlZCcsIHsgbmFtZTogJ3Byb3RlY3RlZCcsIHByZVZhbGlkYXRpb246IGFwcC5hdXRoZW50aWNhdGUgfSwgKHJlcSwgcmVwbHkpID0+IHtcbiAgICAgIHJlcGx5LnJlbmRlcignd2VsY29tZS9pbmRleCcpO1xuICAgIH0pO1xufTtcblxuLy8gcmVxdWVzdCBvYmplY3Q6XG4vLyBjb25zb2xlLmxvZygncmVxLmJvZHknLCByZXEuYm9keSk7XG4vLyBjb25zb2xlLmxvZygncmVxLnF1ZXJ5JywgcmVxLnF1ZXJ5KTtcbi8vIGNvbnNvbGUubG9nKCdyZXEucGFyYW1zJywgcmVxLnBhcmFtcyk7XG4vLyBjb25zb2xlLmxvZygncmVxLmhlYWRlcnMnLCByZXEuaGVhZGVycyk7XG4vLyBjb25zb2xlLmxvZygncmVxLnJhdycsIHJlcS5yYXcpO1xuLy8gY29uc29sZS5sb2coJ3JlcS5zZXJ2ZXInLCByZXEuc2VydmVyKTtcbi8vIGNvbnNvbGUubG9nKCdyZXEuaWQnLCByZXEuaWQpO1xuLy8gY29uc29sZS5sb2coJ3JlcS5pcCcsIHJlcS5pcCk7XG4vLyBjb25zb2xlLmxvZygncmVxLmlwcycsIHJlcS5pcHMpO1xuLy8gY29uc29sZS5sb2coJ3JlcS5ob3N0bmFtZScsIHJlcS5ob3N0bmFtZSk7XG4vLyBjb25zb2xlLmxvZygncmVxLnByb3RvY29sJywgcmVxLnByb3RvY29sKTtcbi8vIGNvbnNvbGUubG9nKCdyZXEudXJsJywgcmVxLnVybCk7XG4vLyBjb25zb2xlLmxvZygncmVxLnJvdXRlck1ldGhvZCcsIHJlcS5yb3V0ZXJNZXRob2QpO1xuLy8gY29uc29sZS5sb2coJ3JlcS5yb3V0ZXJQYXRoJywgcmVxLnJvdXRlclBhdGgpO1xuLy8g0L/RgNC4INGD0YHQv9C10YjQvdC+0Lkg0LDRg9GC0LXQvdGC0LjRhNC40LrQsNGG0LjQuCDQtNC+0LHQsNCy0LvRj9C10YLRgdGPIHJlcS51c2VyINGBINC30LDQu9C+0LPQuNC90LXQvdC90YvQvCDRjtC30LXRgNC+0Lxcbi8vIGNvbnNvbGUubG9nKCdyZXEudXNlcicsIHJlcS51c2VyKTtcbiJdfQ==