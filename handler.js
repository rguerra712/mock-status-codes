'use strict';

const status = require('statuses');

module.exports.status = (event, context, callback) => {
  if (!event || !event.pathParameters || !event.pathParameters.code) {
    const response = {
      statusCode: 400,
      body: 'Status code is required!'
    };
    callback(null, response);
    return;
  }

  const code = event.pathParameters.code;
  if (isNaN(code)) {
    const response = {
      statusCode: 400,
      body: 'Status code should be numeric!'
    };
    callback(null, response);
    return;
  }

  if (!status[code]) {
    const response = {
      statusCode: 400,
      body: 'Status code not supported!'
    };
    callback(null, response);
    return;
  }

  const message = status[code];
  const response = {
    statusCode: code,
    body: message
  };
  callback(null, response);
};
