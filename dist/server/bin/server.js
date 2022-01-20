#!/usr/bin/env node
"use strict";

var _index = _interopRequireDefault(require("../index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 5000;
const address = '0.0.0.0';
const fastify = (0, _index.default)();
fastify.listen(port, address, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`server is listening on port: ${port}`);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9iaW4vc2VydmVyLmpzIl0sIm5hbWVzIjpbInBvcnQiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsImFkZHJlc3MiLCJmYXN0aWZ5IiwibGlzdGVuIiwiZXJyIiwibG9nIiwiZXJyb3IiLCJleGl0IiwiaW5mbyJdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUVBOzs7O0FBRUEsTUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixJQUFqQztBQUNBLE1BQU1DLE9BQU8sR0FBRyxTQUFoQjtBQUNBLE1BQU1DLE9BQU8sR0FBRyxxQkFBaEI7QUFFQUEsT0FBTyxDQUFDQyxNQUFSLENBQWVOLElBQWYsRUFBcUJJLE9BQXJCLEVBQStCRyxHQUFELElBQVM7QUFDckMsTUFBSUEsR0FBSixFQUFTO0FBQ1BGLElBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZQyxLQUFaLENBQWtCRixHQUFsQjtBQUNBTixJQUFBQSxPQUFPLENBQUNTLElBQVIsQ0FBYSxDQUFiO0FBQ0Q7O0FBRURMLEVBQUFBLE9BQU8sQ0FBQ0csR0FBUixDQUFZRyxJQUFaLENBQWtCLGdDQUErQlgsSUFBSyxFQUF0RDtBQUNELENBUEQiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCBnZXRBcHAgZnJvbSAnLi4vaW5kZXguanMnO1xuXG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCA1MDAwO1xuY29uc3QgYWRkcmVzcyA9ICcwLjAuMC4wJztcbmNvbnN0IGZhc3RpZnkgPSBnZXRBcHAoKTtcblxuZmFzdGlmeS5saXN0ZW4ocG9ydCwgYWRkcmVzcywgKGVycikgPT4ge1xuICBpZiAoZXJyKSB7XG4gICAgZmFzdGlmeS5sb2cuZXJyb3IoZXJyKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG4gIH1cblxuICBmYXN0aWZ5LmxvZy5pbmZvKGBzZXJ2ZXIgaXMgbGlzdGVuaW5nIG9uIHBvcnQ6ICR7cG9ydH1gKTtcbn0pO1xuIl19