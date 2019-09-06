'use strict';

const validation = function(req) {
  const reqBodyLength = Object.keys(req.body).length;
  const reqToDo = req.body.todo || {};
  let reqDescription = reqToDo.description || {};

  if (typeof reqDescription === 'string') {
    reqDescription = reqDescription.trim();
  }

  if (
    reqBodyLength !== 1 ||
        reqDescription === {} ||
        typeof reqDescription !== 'string' ||
        reqDescription.length === 0
  ) {
    return (reqDescription = '');
  }
  return reqDescription;
};

const findToDo = function(CurrentList, reqId) {
  let toDo = CurrentList.find(todo => todo.id === reqId);
  if (toDo === undefined) {
    throw new Error(`The To-Do item with ID:${reqId} is already not existed`);
  }
  return toDo;
};

module.exports = { validation, findToDo };
