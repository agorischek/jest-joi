import * as Joi from 'joi';
import * as chalk from 'chalk';
import stringifyObject = require('stringify-object');
import { MatcherHintOptions, matcherHint } from 'jest-matcher-utils';

export const toMatchSchema = function (
  this: jest.MatcherContext,
  received: unknown,
  schema: Joi.Schema,
  submittedOptions: Joi.ValidationOptions
) {
  const matcherName = 'toMatchSchema';

  const options = processOptions(submittedOptions);

  const isSchema = Joi.isSchema(schema);
  if (!isSchema) return { message: () => 'Submitted schema was not a valid Joi schema', pass: false };

  const { error } = schema.validate(received, options);
  const pass = !error;

  const matcherHintOptions: MatcherHintOptions = { isNot: this.isNot, promise: this.promise };
  const message = buildMessage(pass, matcherName, received, schema, error, matcherHintOptions);

  return { message, pass };
};

const processOptions = function (submittedOptions: Joi.ValidationOptions): Joi.ValidationOptions {
  const options = submittedOptions === undefined ? {} : submittedOptions;
  if (!options.hasOwnProperty('abortEarly')) options.abortEarly = false;
  return options;
};

const buildMessage = function (
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

const printObject = (object: unknown) =>
  stringifyObject(object, {
    indent: '  ',
    singleQuotes: false,
  });

const receivedColor = chalk.red;
const expectedColor = chalk.green;
