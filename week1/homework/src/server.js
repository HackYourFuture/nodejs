'use strict';

const http = require('http');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here

    response.setHeader('Content-Type', 'application/json');

    switch (request.url) {

      case '/state':
        let number = JSON.stringify({
          state: state
        });
        response.write(number);
        break;

      case '/add':
        let add = JSON.stringify({
          state: ++state
        });
        response.write(add);
        break;

      case '/subtract':
        let subtract = JSON.stringify({
          state: --state
        });
        response.write(subtract);
        break;

      case '/reset':
        state = 10;
        let reset = JSON.stringify({
          state: state
        });
        response.write(reset);
        break;

      default:
        let error = JSON.stringify({
          error: 'Not found'
        });
        response.statusCode = 404;
        response.write(error);
        break;
    }
    response.end();
  });
  return server;
}
module.exports = {
  createServer
};