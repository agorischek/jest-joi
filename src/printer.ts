import * as Joi from 'joi';
import * as chalk from 'chalk';
import { MatcherHintOptions, matcherHint } from 'jest-matcher-utils';
import stringifyObject = require('stringify-object');

export const buildMessage = function (
    pass: boolean,
    matcherName: string,
    received: unknown,
    schema: Joi.Schema,
    error: Joi.ValidationError,
    matcherHintOptions: MatcherHintOptions
) {
    const hint = matcherHint(matcherName, 'received', 'schema', matcherHintOptions);

    return pass
        ? () =>
            `${hint}\n\n` +
            `Schema:\n${expectedColor(printObject(schema.describe()))}\n\n` +
            `Received:\n${receivedColor(printObject(received))}`
        : () => `${hint}\n\nReceived:\n${error.annotate()}`;
};

export const printObject = (object: unknown) =>
    stringifyObject(object, {
        indent: '  ',
        singleQuotes: false,
    });

const receivedColor = chalk.red;
const expectedColor = chalk.green;