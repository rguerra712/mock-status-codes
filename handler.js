'use strict';

const status = require('statuses');
const {
  getValidationErrorFor
} = require('../../lib/parameter-validator');

module.exports.status = (event, context, callback) => {
  const code = event && event.pathParameters && event.pathParameters.code;
  const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
  const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;
  const errorResponse = getValidationErrorFor(code);
  if (errorResponse) {
    callback(null, errorResponse);
    return;
  }

  const message = status[code];
  const response = {
    statusCode: code,
    body: message
  };
  callback(null, response);
};
