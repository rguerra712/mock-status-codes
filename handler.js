'use strict';

const status = require('statuses');
const {
  getValidationErrorFor
} = require('./lib/parameter-validator');

module.exports.status = (event, context, callback) => {
  const code = event && event.pathParameters && event.pathParameters.code;
  const alternateCode = event && event.queryStringParameters && event.queryStringParameters.alternateCode;
  const alternateProbability = event && event.queryStringParameters && event.queryStringParameters.alternateProbability;
  const errorResponse = getValidationErrorFor(code, alternateCode, alternateProbability);
  if (errorResponse) {
    callback(null, errorResponse);
    return;
  }

  let codeToUse = code;
  if (alternateCode && alternateProbability) {
    const random = Math.random();
    if (random <= alternateProbability) {
      codeToUse = alternateCode;
    }
  }

  const message = status[codeToUse];
  const response = {
    statusCode: codeToUse,
    body: message
  };
  callback(null, response);
};
