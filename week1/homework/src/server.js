'use strict';

const http = require('http');
const sendJson = require('./sendJsonResponse');
const sendError = require('./sendError');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    switch (request.url){
      case '/state':
        sendJson(response, state);
        break;

      case '/add':
        state++;
        sendJson(response, state)
        break;

      case '/subtract':
        state--;
        sendJson(response, state)
        break;

      case '/reset':
        state = 10;
        sendJson(response, state)
        break;

      default:
        sendError(response);
    }
  });

  return server;
}

module.exports = {
  createServer
};
