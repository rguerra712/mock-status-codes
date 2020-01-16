'use strict'

const {
    getValidationErrorFor
} = require('../../lib/parameter-validator');

test('should be invalid for null path parameter', () => {
    // Arrange
    const pathParameters = null;
    const event = { pathParameters };
    const code = event && event.pathParameters && event.pathParameters.code;

    // Act
    const error = getValidationErrorFor(code);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Status code is required!', 'should match error body');
});

test('should be invalid for null code', () => {
    // Arrange
    const pathParameters = {};
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;

    // Act
    const error = getValidationErrorFor(code)

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Status code is required!', 'should match error body');
});

test('should be invalid for non-numeric code', () => {
    // Arrange
    const pathParameters = { code: 'code'};
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;

    // Act
    const error = getValidationErrorFor(code);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Status code should be numeric!', 'should match error body');
});

test('should be invalid for non-supported numeric code', () => {
    // Arrange
    const pathParameters = { code: 1};
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;

    // Act
    const error = getValidationErrorFor(code);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Status code not supported!', 'should match error body');
});

test('should be valid for just a supported numeric code', () => {
    // Arrange
    const pathParameters = {
        code: 400
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;

    // Act
    const error = getValidationErrorFor(code);

    // Assert
    expect(error).toBe(null, 'should contain no error');
});

test('should be invalid for supported numeric code with alternate code and missing probability', () => {
    // Arrange
    const pathParameters = {
        code: 400,
        alternateCode: 301,
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Probability required when alternate code provided!', 'should match error body');
});

test('should be invalid for supported numeric code with missing alternate code and probability', () => {
    // Arrange
    const pathParameters = {
        code: 400,
        alternateProbability: .1,
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Alternate code required when probability provided!', 'should match error body');
});

test('should be invalid for supported numeric code with non-numeric alternate code and probability', () => {
    // Arrange
    const pathParameters = {
        code: 400,
        alternateCode: 'code',
        alternateProbability: .1,
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Alternate code should be numeric!', 'should match error body');
});

test('should be invalid for supported numeric code with non-supported alternate code and probability', () => {
    // Arrange
    const pathParameters = {
        code: 400,
        alternateCode: 1,
        alternateProbability: .1,
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Alternate code not supported!', 'should match error body');
});

test('should be invalid for supported numeric code with alternate code and non-numeric probability', () => {
    // Arrange
    const pathParameters = {
        code: 400,
        alternateCode: 200,
        alternateProbability: 'prob',
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Probability should be numeric!', 'should match error body');
});

test('should be invalid for supported numeric code with alternate code and negative probability', () => {
    // Arrange
    const pathParameters = {
        code: 400,
        alternateCode: 200,
        alternateProbability: -.1,
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Probability should be between 0 and 1 non-exclusive!', 'should match error body');
});

test('should be invalid for supported numeric code with alternate code and zero probability', () => {
    // Arrange
    const pathParameters = {
        code: 400,
        alternateCode: 200,
        alternateProbability: 0,
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Probability required when alternate code provided!', 'should match error body');
});

test('should be invalid for supported numeric code with alternate code and one probability', () => {
    // Arrange
    const pathParameters = {
        code: 400,
        alternateCode: 200,
        alternateProbability: 1,
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Probability should be between 0 and 1 non-exclusive!', 'should match error body');
});

test('should be invalid for supported numeric code with alternate code and gt one probability', () => {
    // Arrange
    const pathParameters = {
        code: 400,
        alternateCode: 200,
        alternateProbability: 1.5,
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Probability should be between 0 and 1 non-exclusive!', 'should match error body');
});

test('should be invalid for supported numeric code with alternate code and gt one probability', () => {
    // Arrange
    const pathParameters = {
        code: 200,
        alternateCode: 200,
        alternateProbability: 1.5,
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).not.toBe(null, 'should contain an error');
    expect(error.body).not.toBe(null, 'should have an error body');
    expect(error.statusCode).toBe(400, 'expected 400 status code');
    expect(error.body).toBe('Alternate code must not equal status code!', 'should match error body');
});

test('should be valid for just a supported numeric code with alternate code and probability', () => {
    // Arrange
    const pathParameters = {
        code: 400,
        alternateCode: 200,
        alternateProbability: .1,
    };
    const event = {
        pathParameters
    };
    const code = event && event.pathParameters && event.pathParameters.code;
    const alternateCode = event && event.pathParameters && event.pathParameters.alternateCode;
    const alternateProbability = event && event.pathParameters && event.pathParameters.alternateProbability;

    // Act
    const error = getValidationErrorFor(code, alternateCode, alternateProbability);

    // Assert
    expect(error).toBe(null, 'should contain no error');
});