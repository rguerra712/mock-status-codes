'use strict';

const status = require('statuses');

module.exports.getValidationErrorFor = (code, alternateCode, alternateProbability) => {
    if (!code) {
        return {
            statusCode: 400,
            body: 'Status code is required!'
        };
    }

    if (isNaN(code)) {
        return {
            statusCode: 400,
            body: 'Status code should be numeric!'
        };
    }

    if (!status[code]) {
        return {
            statusCode: 400,
            body: 'Status code not supported!'
        };
    }

    if (alternateCode && !alternateProbability) {
        return {
            statusCode: 400,
            body: 'Probability required when alternate code provided!'
        };
    }

    if (!alternateCode && alternateProbability) {
        return {
            statusCode: 400,
            body: 'Alternate code required when probability provided!'
        };
    }

    if (alternateCode && isNaN(alternateCode)) {
        return {
            statusCode: 400,
            body: 'Alternate code should be numeric!'
        };
    }

    if (alternateCode && alternateCode === code) {
        return {
            statusCode: 400,
            body: 'Alternate code must not equal status code!'
        };
    }

    if (alternateProbability && isNaN(alternateProbability)) {
        return {
            statusCode: 400,
            body: 'Probability should be numeric!'
        };
    }

    if (alternateProbability && (alternateProbability <= 0 || alternateProbability >= 1)) {
        return {
            statusCode: 400,
            body: 'Probability should be between 0 and 1 non-exclusive!'
        };
    }

    if (alternateCode && !status[alternateCode]) {
        return {
            statusCode: 400,
            body: 'Alternate code not supported!'
        };
    }

    return null;
}